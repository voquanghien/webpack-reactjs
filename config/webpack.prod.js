const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(baseConfig.config, {
    mode: "production",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
    resolve: {
        modules: [
            path.resolve("node_modules"),
            path.resolve(baseConfig.assetDir),
            path.resolve(baseConfig.srcDir)
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
            cache: true,
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: false
              },
              output: {
                comments: false
              }
            }
          })
        ]
    },
    devServer: {
        compress: true
    }
});
