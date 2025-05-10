// webpack.config.js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // Indicates that we are building for Node.js, not browser
  mode: 'development', // Use 'development' for debugging or 'production' for release
  entry: './src/index.ts', // Main entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file
  },
  externals: [nodeExternals()], // Exclude node_modules from the output bundle
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply ts-loader for .ts files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'], // Add .ts to the list of resolved extensions
  },
};
