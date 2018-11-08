/**
 * Created by mr.zhang on 2017/8/4.
 */
var webpack = require('webpack');
var path = require('path');
// var HtmlwebpackPlugin = require('html-webpack-plugin');//html模块
var FastUglifyJsPlugin = require('fast-uglifyjs-plugin'); //资源包压缩
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var INDEX = path.resolve(ROOT_PATH, 'src/app.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
module.exports = {
	devtool: 'eval-source-map',
	mode: 'development',
	entry: {
		index: INDEX
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].min.js'
	},

	resolve: {
		extensions: [ '.jsx', '.js', '.json' ]
	},
	optimization: {
		// minimizer: [
		// 	new UglifyJsPlugin({
		// 		uglifyOptions: {
		// 			compress: false
		// 		}
		// 	})
		// ]
	},
	module: {
		//在配置文件里添加JSON loader
		rules: [
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.(css)$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=images/[hash:8].[name].[ext]' }, //图片打包配置
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader'
			}
		]
	},
	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		historyApiFallback: true,
		inline: true
	},
	plugins: [ new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin() ]
};
