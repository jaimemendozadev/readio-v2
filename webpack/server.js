const Dotenv = require('dotenv-webpack');
const path = require('path');
const entry = path.resolve(__dirname, '../index.js');

//need target: 'node' for dotenv and mongoose modules
//https://github.com/mrsteele/dotenv-webpack

module.exports = {
  target: 'node',

  entry,

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'raw-loader'},
    ],
  },
  plugins: [new Dotenv()],
};
