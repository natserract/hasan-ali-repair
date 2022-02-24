const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

/** @returns {import('webpack').Configuration} Webpack Configuration */

module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify")
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  // Add custom plugins for your project
  config.plugins.push(new Dotenv())
  config.plugins.push(new webpack.ProvidePlugin({
    process: 'process/browser',
  }))

  return config
}
