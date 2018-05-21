const path = require('path');
const entry = path.resolve(__dirname, '../dev/index.jsx');
module.exports = {
  entry,
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  module: {
    rules: [
      { test: /\.js?x$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
}