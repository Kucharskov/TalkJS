const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './frontend/client/client.js',
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: 'client.js'
	},
	plugins: [
		new UglifyJSPlugin()
	]
};
