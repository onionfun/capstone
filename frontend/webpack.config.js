// const webpack = require("webpack");
// const path = require('path');

// module.exports = {
// 	entry: {
// 		app: "./src/App.js"
// 	},
// 	output: {
// 		filename:"build/bundle.js",
//         sourceMapFilename: "build/bundle.map"
// 	},
//     devtool: '#source-map',	
// 	// plugins: [
//  //    	new webpack.optimize.UglifyJsPlugin({minimize: true}),
// 	// ],	
// 	module: {
// 		loaders: [
// 			{
// 				test: /\.jsx?$/,
// 				exclude: /(node_modules|bower_components)/,
// 				loader: 'babel',
// 				query:{
// 					presets:['react', 'es2015']
// 				}
// 			}
// 		]
// 	}
// }