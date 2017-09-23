import merge from 'webpack-merge'
import base from './webpack.base.config'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import webpack from 'webpack'

export default merge(base, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    entry: {
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server'
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
})
