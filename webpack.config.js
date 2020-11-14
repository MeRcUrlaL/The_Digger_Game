const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ASSET_PATH = process.env.ASSET_PATH || './';

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './js/game.js',
	output: {
		filename: 'bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: ASSET_PATH
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	devServer: {
		port: 3000,
		hot: true
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new CopyPlugin({
      patterns: [
				{ 
					from: path.resolve(__dirname, './src/favicon.ico'),
					to: path.resolve(__dirname, './dist/favicon.ico')
				},
        { 
					from: path.resolve(__dirname, './src/img/drill/'),
					to: path.resolve(__dirname, './dist/img/')
				}
      ],
		}),
		new MiniCssExtractPlugin({
			filename: 'bundle.[hash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: false,
							name:'[hash].[ext]',
							outputPath: 'fonts'
						},
					},
				],
			},
			{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
							limit: false,
							name: '[hash].[ext]',
							outputPath: 'img'
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i, // test: /\.s[ac]ss$/i,
        use: [
					MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
				],
			},
		]
	}
}