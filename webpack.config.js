const webpack = require('webpack');
const path = require('path');

let config = {
  entry: './frontend-src/client.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js'
  }
};

module.exports = config;
