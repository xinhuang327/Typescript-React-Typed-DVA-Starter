var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function isExternal(module) {
	var context = module.context;

	if (typeof context !== 'string') {
		return false;
	}

	return context.indexOf('node_modules') !== -1;
}


module.exports = {
	context: __dirname + '/src', // `__dirname` is root of project and `src` is source
	entry: {
		'app': [
			'./app.tsx'
		]
	},
	output: {
		path: __dirname + '/dist', // `dist` is the destination
		filename: '[name].js',
		chunkFilename: '[name].js',
		publicPath: "/dist/", // NOTE: must have last backslash for hot-update url to be correct.
	},
	devServer: {
		contentBase: __dirname + '/src',
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", '.scss', '.css', '.json'],
		alias: {
			'redux-saga/effects.js': 'redux-saga/es/effects.js', // type-dva is explicitly using files in /es
			'redux-saga/util.js': 'redux-saga/es/util.js',
			"create-react-class": __dirname + "/node_modules/create-react-class",
			"lodash": __dirname + "/node_modules/semantic-ui-react/node_modules/lodash",
			"prop-types": __dirname + "/node_modules/semantic-ui-react/node_modules/prop-types",
			"core-js": __dirname + "/node_modules/@babel/runtime/node_modules/core-js",
			"invariant": __dirname + "/node_modules/typed-dva/node_modules/invariant",
			"fbjs": __dirname + "/node_modules/react-dom/node_modules/fbjs",
			"regenerator-runtime": __dirname + "/node_modules/babel-runtime/node_modules/regenerator-runtime",
			"shallowequal": __dirname + "/node_modules/shallowequal"
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: ['babel-loader', 'ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.js$/, //Check for all js files
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								outputStyle: "compressed"
							}
						}
					]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: {
						loader: 'css-loader', options: {
							// modules: true,
							// localIdentName: '[name]__[local]___[hash:base64:5]'
						}
					}
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader', options: {
								// modules: true,
								// localIdentName: '[name]__[local]___[hash:base64:5]'
							}
						},
						'less-loader'
					]
				})
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/, loader: 'url-loader?limit=8192' }
		]
	},
	devtool: "source-map",
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
		new ExtractTextPlugin("[name].less"),

		new webpack.DefinePlugin({ // <-- key to reducing React's size
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'app',
		// 	minChunks: function (module, count) {
		// 		return !isExternal(module) && count >= 2; // adjustable
		// 	},
		// 	// async: true,
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendors',
		// 	chunks: ['app'],
		// 	// or if you have an key value object for your entries
		// 	// chunks: Object.keys(entry).concat('common')
		// 	minChunks: function (module) {
		// 		return isExternal(module);
		// 	},
		// 	// async: "vendors",
		// }),
		new webpack.optimize.ModuleConcatenationPlugin(),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 		screw_ie8: true,
		// 		conditionals: true,
		// 		unused: true,
		// 		comparisons: true,
		// 		sequences: true,
		// 		dead_code: true,
		// 		evaluate: true,
		// 		if_return: true,
		// 		join_vars: true
		// 	},
		// 	output: {
		// 		comments: false
		// 	}
		// }),
		// new webpack.HashedModuleIdsPlugin(),
		// new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 
		new DuplicatePackageCheckerPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				sassLoader: {
					includePaths: [
						'./node_modules'
					]
				},
				context: __dirname,
			},
		}),
	]
}