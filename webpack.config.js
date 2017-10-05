const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry:  {
		client: './frontend/client/client.js',
		admin: './frontend/admin/admin.js'
	},
	output: {
		path: __dirname + '/public/js',
		filename: '[name].js'
	},
	plugins: [
		new UglifyJSPlugin()
	]
};