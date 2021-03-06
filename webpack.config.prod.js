import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index'),
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/internet-famous/',
        filename: 'bundle.js'
    },
    plugins: [
        new WebpackMd5Hash(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          },
          inject: false
        }),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ],
    module: {
        loaders: [
            {test: /\.html$/, loader: 'html-loader'},
            {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel-loader']},
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
            {test: /(\.scss)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};
