var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var API_URL = {
    production: JSON.stringify("https://vr-rpg-server.herokuapp.com"),
    development: JSON.stringify("http://localhost:8080"),
}

var WEBSOCKET_URL = {
    production: JSON.stringify("wss://vr-rpg-server.herokuapp.com"),
    development: JSON.stringify("ws://localhost:8080"),
}

var environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    context: path.join(__dirname, ''),
    plugins: [
        new CopyWebpackPlugin([
            { from: 'node_modules/babylonjs/dist/preview release/babylon.js', to: 'lib' },
            { from: 'node_modules/babylonjs/dist/preview release/gui/babylon.gui.js', to: 'lib' },
            { from: 'node_modules/babylonjs/dist/preview release/loaders/babylon.objFileLoader.min.js', to: 'lib' },
            { from: 'index.html', to: '' }
        ]),
        new webpack.DefinePlugin({
            'API_URL': API_URL[environment],
            'WEBSOCKET_URL': WEBSOCKET_URL[environment]
        })
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};