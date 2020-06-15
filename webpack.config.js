const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

function HtmlWebpackPlugins(file, path ) {
  return new HtmlWebpackPlugin({
    filename: file,
    template: path
  })
}

module.exports = {
  mode: 'development',
  entry:  './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js')
  },
  plugins: [
    new CleanWebpackPlugin(),

    HtmlWebpackPlugins('index.html', './src/index.html'),
    HtmlWebpackPlugins('favourites.html', './src/favourites.html'),
    HtmlWebpackPlugins('main.html', './src/main.html'),
    HtmlWebpackPlugins('object.html', './src/object.html'),
    HtmlWebpackPlugins('object-modal.html', './src/object-modal.html'),
    HtmlWebpackPlugins('preloader.html', './src/preloader.html'),
    HtmlWebpackPlugins('bids.html', './src/bids.html'),

    new CopyPlugin([
      {from: './src/favicon.ico', to: ''},
      { from: './src/img', to: '' },
    ]),
    new MiniCssExtractPlugin({
      filename : filename('css'),
    }),
  ],
  devtool : isDev ? 'source-map' : false,
  devServer : {
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
}
