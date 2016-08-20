var path = require('path');
var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'jquery/dist/jquery.min.js',
  'angular/angular.min.js',
  'moment/min/moment.min.js',
  'jquery-ui-bundle/jquery-ui.min.js',
  'angular-animate/angular-animate.min.js',
  'angular-material/angular-material.min.js',
  'angular-aria/angular-aria.min.js',
  'angular-chosen/dist/chosen.min.js',
  'chosen-npm/public/chosen.jquery.min.js'
];


var config = {
  entry: [
    'webpack-hot-middleware/client?reload=true&path=http://localhost:9000/__webpack_hmr',
    './src/index',
  ],
  module: {
    loaders: [
        {
        test: path.resolve(node_modules_dir, deps[1]),
            loader: "expose?angular!exports?window.angular"
        },
        {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            // include: /js\/builder/,
            loader: 'babel-loader'
        }, {
            test: /\.ts$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            loader: 'ts'
        }, {
            test: /\.html$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            loader: 'raw-loader'
        }, {
            test: /\.css$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        },
        {
            test: /\.(png|jpg)$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            include: [
              path.resolve(__dirname, "src")
            ],
            exclude: /node_modules/,
            loader: 'file-loader'
        }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:9000/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
        'process.env': Object.keys(process.env).reduce(function(o, k) {
            o[k] = JSON.stringify(process.env[k]);
            return o;
        }, {})
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

// deps.forEach(function(dep) {
//     var depPath = path.resolve(node_modules_dir, dep);
//     config.resolve.alias[dep.split(path.sep)[0]] = depPath;
//     config.module.noParse.push(depPath);
// });


config.target = webpackTargetElectronRenderer(config);

module.exports = config;
