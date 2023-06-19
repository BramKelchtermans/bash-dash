const resolve = require('path').resolve
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: ['./index.js'],
    output: {
        filename: "[name].js",
        path: resolve(__dirname, './dist')
    },
    externals: [nodeExternals()]
}