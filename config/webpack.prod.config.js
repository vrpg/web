import base from './webpack.base.config'
import merge from 'webpack-merge'
import webpack from 'webpack'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default merge(base, {
    output:{
        filename: "bundle.min.js"
    },
    plugins: [
        new UglifyJsPlugin()
    ]
})
