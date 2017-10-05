const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry:  {
		client : './frontend/client/client.js',
		admin : './frontend/admin/admin.js',
	},
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: "[name].js"
	},
	plugins: [
		//new UglifyJSPlugin()
	]
};