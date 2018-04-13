const path = require('path');
const webpack = require('webpack');


/**
 * Define plugins based on environment
 * @param {boolean} isDev If in development mode
 * @return {Array}
 */
function getPlugins(isDev) {

  const plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({}),
  ];

  if (isDev) {
    plugins.push(new webpack.NoErrorsPlugin());
  } else {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }));
  }

  return plugins;

}


/**
 * Define loaders
 * @return {Array}
 */
function getLoaders() {

  const loaders = [{
    test: /(\.js)/,
    exclude: /(node_modules)/,
    loaders: ['babel'],
  }, {
    test: /(\.jpg|\.png)$/,
    loader: 'url-loader?limit=10000',
  }, {
    test: /\.json/,
    loader: 'json-loader',
  }];

  return loaders;

}

function _path(p) {
  return path.join(__dirname, p);
}


module.exports = (config) => {
  return {
    entry: {
      'fabricator/scripts/f': config.scripts.fabricator.src,
      'toolkit/scripts/toolkit': config.scripts.toolkit.src,
    },
    output: {
      path: path.resolve(__dirname, config.dest, 'assets'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['', '.js'],
    },
    plugins: getPlugins(config.dev),
    module: {
      loaders: getLoaders(),
    },
    resolve: {
      alias: {
        // jquery is NOT a peer dependency in jquery.inputmask so a alias
        // is used here to force jquery.inputmask to use your jquery
        // version
        'jquery': _path('node_modules/jquery/dist/jquery'),
        // Switch dependency lib accordingly (this one uses jquery)
        'inputmask.dependencyLib': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
        // Core library (order of these aliases shouldn't matter FYI)
        'inputmask' : _path('node_modules/jquery.inputmask/dist/inputmask/inputmask'),
        // Allows use of jquery input mask via jquery chaining api/$('selector').inputmask(...)
        'jquery.inputmask': _path('node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
        // Add extensions following the pattern below remember to import them as necessary in your .js files
        'inputmask.numeric.extensions': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),
      },  
    },
  };
};


// 'use strict';

// let webpack = require('webpack');
// let path = require('path');

// function _path(p) {
//   return path.join(__dirname, p);
// }

// module.exports = {
//   entry: {
//     app: './index.js',
//   },

//   output: {
//     filename: '[name].js',
//   },
  
//   resolve: {
//     alias: {
//       // jquery is NOT a peer dependency in jquery.inputmask so a alias
//       // is used here to force jquery.inputmask to use your jquery
//       // version
//       'jquery': _path('node_modules/jquery/dist/jquery'),
//       // Switch dependency lib accordingly (this one uses jquery)
//       'inputmask.dependencyLib': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib'),
//       // Core library (order of these aliases shouldn't matter FYI)
//       'inputmask' : _path('node_modules/jquery.inputmask/dist/inputmask/inputmask'),
//       // Allows use of jquery input mask via jquery chaining api/$('selector').inputmask(...)
//       'jquery.inputmask': _path('node_modules/jquery.inputmask/dist/inputmask/jquery.inputmask'),
//       // Add extensions following the pattern below remember to import them as necessary in your .js files
//       'inputmask.numeric.extensions': _path('node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions'),
//     },
//   },
// };
