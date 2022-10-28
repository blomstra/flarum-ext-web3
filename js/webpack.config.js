const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { merge } = require('webpack-merge');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('flarum-webpack-config');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(config(), {
  output: {
    chunkFilename: 'chunk~[name].js?ver=[contenthash]',
  },
  plugins: [
    new NodePolyfillPlugin({
      includeAliases: ['os', 'stream', 'util', 'assert', 'http', 'url', 'https', 'crypto', 'process'],
    }),
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), '../assets/*'), path.resolve(process.cwd(), 'dist/*')],
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [{ source: 'dist/chunk*', destination: '../assets/' }],
        },
      },
    }),
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
  resolve: {
    fallback: {
      fs: false,
      buffer: require.resolve('buffer/'),
    },
  },
});
