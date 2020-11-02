const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const paths = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
	html: path.resolve(__dirname, 'src', 'index.html'),
	favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
	faviconDev: path.resolve(__dirname, 'src', 'favicon-dev.ico'),
};

module.exports = (env) => ({
	entry: ['react-hot-loader/patch', paths.src],
	output: {
		filename: 'main.js',
		path: paths.dist,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
				},
			},
			{
				test: /\.md$/i,
				use: 'raw-loader',
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							ref: true,
							svgoConfig: {
								plugins: {
									removeViewBox: false,
								},
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({ template: paths.html, favicon: env === 'dev' ? paths.faviconDev : paths.favicon }),
		new webpack.DefinePlugin({
			'process.env.BASE_URL': JSON.stringify(
				env === 'dev'
					? 'https://us-central1-muil-dev.cloudfunctions.net/v1'
					: 'https://us-central1-muil-io.cloudfunctions.net/v1',
			),
		}),
	],
});
