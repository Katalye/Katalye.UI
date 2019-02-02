const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');

const outputDirectory = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
        path: outputDirectory
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
        new webpack.HashedModuleIdsPlugin()
    ],
});