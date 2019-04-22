const path = require('path');

/*
//const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve('src'),
    entry: {
        app: ["./index.ts"]
    },
    output: {
        filename: 'discounter-strike.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: 'src'
    },
    watch: true,
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "babel-loader"
            // },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loaders: 'ts-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            // {
            //     test: /\.scss$/,
            //     exclude: /node_modules/,
            //     loader: 'style!css!sass'
            // },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            // {
            //     test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     exclude: /node_modules/,
            //     loader: 'url-loader?limit=1000000&mimetype=application/font-woff'
            // },
            // {
            //     test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     exclude: /node_modules/,
            //     loader: 'file-loader'
            // },
            // {
            //     test: /\.json$/,
            //     exclude: /node_modules/,
            //     loader: "json-loader"
            // },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
    //   new HtmlWebpackPlugin({
    //       template: './src/index.html',
    //       filename: './index.html',
    //       inject: 'body',
    //       hash: true
    //   })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}
*/

module.exports = {
    entry: './src/index.html',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'discounter-strike.js',
        path: path.resolve(__dirname, 'dist')
    }
};
