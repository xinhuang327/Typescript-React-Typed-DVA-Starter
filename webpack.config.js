var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	context: __dirname + '/src', // `__dirname` is root of project and `src` is source
	entry: {
		'app': [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
			'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			'./app.tsx'
		]
	},
	output: {
		path: __dirname + '/dist', // `dist` is the destination
		filename: '[name].js',
		publicPath: "/dist/", // NOTE: must have last backslash for hot-update url to be correct.
	},
	devServer: {
		host: 'localhost',
		port: 3000,
		contentBase: __dirname + '/src',
		hot: true,
		proxy: {
			// '/fileupload/**': {
			// 	target: 'http://localhost:8090/',
			// },
			// '/api/**': {
			// 	target: 'http://localhost:8090/',
			// },
			// '/upload/**': {
			// 	target: 'http://localhost:8090/',
			// },
			// '/post/**': {
			// 	target: 'http://localhost:8090/',
			// }
		}
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", '.scss', '.css', '.json']
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
				use: ["style-loader", 'css-loader'],
				// use: ExtractTextPlugin.extract({
				// 	fallback: "style-loader",
				// 	use: [
				// 		{
				// 			loader: 'css-loader'
				// 		},
				// 	]
				// }),
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader'
						},
						'less-loader'
					]
				}),
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/, loader: 'url-loader?limit=100000' }
		]
	},
	devtool: "eval-source-map",
	// devtool: "source-map",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin("[name].css"),
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