import merge from 'webpack-merge'
import base from './webpack.base.config'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default merge(base, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
})
