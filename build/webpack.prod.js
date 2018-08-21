const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  // cheap-module-eval-source-map is faster for development
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: path.posix.join('public', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('public', 'js/[id].[chunkhash].js'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: () => ({
          name: 'vendor',
          minChunks: module => (
            module.resource
              && /\.js$/.test(module.resource)
              && module.resource.indexOf(
                path.join(__dirname, '../node_modules'),
              ) === 0
          ),
        }),
        manifest: () => ({
          name: 'manifest',
          chunks: ['vendor'],
        }),
      },
    },
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: true,
    })],
  },
  plugins: [
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: path.posix.join('public', 'css/[name].[contenthash].css'),
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks(module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource
    //       && /\.js$/.test(module.resource)
    //       && module.resource.indexOf(
    //         path.join(__dirname, '../node_modules'),
    //       ) === 0
    //     );
    //   },
    // }),
    // // extract webpack runtime and module manifest to its own file in order to
    // // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor'],
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: './',
        ignore: ['.*'],
      },
    ]),
    new CleanWebpackPlugin(['dist/*.*', 'dist/public'], {
      root: path.resolve(__dirname, '..'),
    }),
  ],
});
