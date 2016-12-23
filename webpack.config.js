var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/App.js',
  output: {
    path: './public/bundled',
    publicPath: '/bundled/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: require.resolve('jquery'), loader: 'expose?jQuery!expose?$' },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      React: 'react',
    })
  ]
};
