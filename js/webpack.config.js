const flarumConfig = require('flarum-webpack-config')();

module.exports = {
  ...flarumConfig,
  module: {
    ...flarumConfig.module,
    rules: [
      ...flarumConfig.module.rules,
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
        },
      },
    ]
  }
}
