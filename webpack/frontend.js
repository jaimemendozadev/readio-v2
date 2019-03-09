const path = require('path');
const entry = path.resolve(__dirname, '../dev/index.jsx');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  return {
    entry,

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../public'),
    },
    module: {
      rules: [
        {test: /\.js?x$/, exclude: /node_modules/, loader: 'babel-loader'},
        {test: /\.(svg|png|jpe?g)$/, loader: 'file-loader'},
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV),
        },
      }),
      new ExtractTextPlugin('styles.css'),
    ],
  };
};
