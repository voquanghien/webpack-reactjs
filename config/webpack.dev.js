const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.common.js");
const path = require("path");

module.exports = merge(baseConfig.config, {
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.jsx?$/,
            options: {
              eslint: {
                emitError: true,
                emitWarning: false,
                quiet: true,
                fix: true,
                failOnError: true,
                failOnWarning: false
              }
            }
        })
    ],
    devtool: "eval-source-map",
    resolve: {
        modules: [
            path.resolve(baseConfig.assetDir),
            path.resolve(baseConfig.srcDir),
            path.resolve("node_modules")
        ]
    }
});
