var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    {
      test: /\.less$/,
      loader: 'style!css!less'
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // Required 
      inject: false,
      template: 'src/web/index.ejs',
 
      // Optional 
      appMountId: 'app',
      // baseHref: 'https://podorozhnik.firebaseapp.com',
      // devServer: 3001,
      devServer: 'http://localhost:8080',
      googleAnalytics: {
        trackingId: 'UA-76217125-4',
        pageViewOnLoad: true
      },
      mobile: true,
      title: 'Подорожник - калькулятор',
      window: {
        // env: {
        //   apiHost: 'http://myapi.com/api/v1'
        // }
      }
 
      // and any other config options from html-webpack-plugin 
      // https://github.com/ampedandwired/html-webpack-plugin#configuration 
    })
  ]
};