const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        inline: true,
        contentBase: '/',
        historyApiFallback: true,
        port: 8080,
        proxy: {
            '/api': 'http://localhost:5000',
            '/hub': {
                target: 'http://localhost:5000',
                ws: true
            }
        }
    },
});