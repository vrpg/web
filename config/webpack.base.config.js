import config from './config.js'
import express from 'express'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const paths = config.utils_paths

module.exports = {
    target: 'web',
    entry: {
        app: [
            paths.src('index.tsx'),
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server'
        ]
    },
    output: {
        filename: "bundle.js",
        path: paths.dist()
    },

    context: path.base,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(config.globals),
        new HtmlWebpackPlugin({
            template: paths.base('index.html'),
            hash: false,
            favicon: paths.src('static/favicon.ico'),
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            },
            chunksSortMode: 'dependency',
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin()
    ],

    devServer: {
        host: 'localhost',
        port: 3000,
        contentBase: paths.dist(),
        historyApiFallback: true,
        inline: false,
        overlay: true,
        quiet: false,
        hot: true,
        setup(app) {
            app.use(express.static(paths.src('static')))
        }
    },

    resolve: {
        modules: [paths.base('node_modules')],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"]
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ]
    },
};
