const path = require('path');

module.exports = {
  entry: './src/index.ts', // Entry point for your application
  output: {
    filename: 'bundle.js', // Output JavaScript file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve both .ts and .js extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/, // Exclude node_modules
      },
    ],
  },
  devtool: 'source-map', // Enable source maps for debugging
};
