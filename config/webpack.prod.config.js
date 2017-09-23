import base from './webpack.base.config'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'

export default merge(base, {
    output:{
        filename: "bundle.min.js"
    },
    plugins: [
        /* TODO fix uglifyJS!!!
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })*/
    ]
})
