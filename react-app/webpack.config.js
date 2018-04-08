const path = require("path")
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "../server/public"),
        filename: "[name].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    "style-loader", "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", "css-loader", "less-loader",
                ],
                include: [path.resolve(__dirname, "./src/")]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [
                                    require("autoprefixer")({
                                        browsers: ">5%"
                                    }),
                                    require("precss")
                                ]
                            }
                        }
                    }, {
                        loader: "sass-loader"
                    }]
                }),
            },
            {
                test: /\.js$/,
                include: /src/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        "presets": ["env", "stage-0"]
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: "img/"
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("./css/common.css"),
        new HtmlWebpackPlugin({
            xhtml: true,
            template: "./index.html",
            filename: path.resolve(__dirname, "../server/views/index.ejs")
        }),
        // new webpack.DefinePlugin({
        //     'process.env':{
        //         NODE_ENV:JSON.stringify('development'),
        //         BABEL_ENV:JSON.stringify("development")
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
}