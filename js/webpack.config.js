// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { merge } = require('webpack-merge');
const config = require('flarum-webpack-config');
const path = require('path');

module.exports = merge(config(), {
  plugins: [
    // new NodePolyfillPlugin({
    //   includeAliases: ['os', 'stream', 'util', 'assert', 'http', 'url', 'https', 'crypto', 'process'],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
        },
      },
    ],
  },
  // resolve: {
  //   fallback: {
  //     fs: false,
  //     buffer: require.resolve('buffer/'),
  //   },
  // },
  // optimization: {
  //   concatenateModules: false,
  // },
});
