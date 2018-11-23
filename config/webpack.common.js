const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBundleSizeAnalyzerPlugin = require("webpack-bundle-size-analyzer").WebpackBundleSizeAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, "../src");
const BUILD_DIR = path.resolve(__dirname, "../build");
const ASSET_DIR = path.resolve(__dirname, "../assets");

module.exports = {
    buildDir: BUILD_DIR,
    srcDir: SRC_DIR,
    assetDir: ASSET_DIR,
    config: {
        entry: {
            main: SRC_DIR + "/index.js",
        },
        output: {
            path: BUILD_DIR,
            filename: '[name].js'
        },
        devtool: "source-map",
        module: {
            rules: [
                {//babel loader for convert es6 -> es5
                    test: /\.js$/,
                    //exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {//optimize images basedy on url-loader/file-loader
                    test: /\.(png|jp(e*)g|svg|gif)$/,  
                    use: [{
                        loader: 'url-loader',
                        options: { 
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[name].[ext]'
                        } 
                    }]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({//auto generate to build/index.html based on template 
                template: ASSET_DIR + "/index.html"
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new CopyWebpackPlugin([ //use to copy assets folder to build folder - build
                {
                    from: ASSET_DIR,
                    to: 'assets'
                } 
            ]),
            new webpack.ProvidePlugin({
                Promise: "es6-promise"
            }),
            new WebpackBundleSizeAnalyzerPlugin(BUILD_DIR + "/plain-report.txt"), //report for building
        ],
        devServer: {
            port: 3002
        }
    }
}