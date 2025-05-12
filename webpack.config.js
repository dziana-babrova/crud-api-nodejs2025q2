import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/index.ts', // Entry point for your TypeScript code
  output: {
    filename: 'bundle.js', // Output bundle name
    path: path.resolve(__dirname, 'dist'), // Output directory
    libraryTarget: 'module', // Ensure Webpack outputs ESM-compatible code
    module: true,
  },
  resolve: {
    extensions: ['.ts', '.js'], // Supported file extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match .ts files
        use: 'ts-loader', // Use ts-loader to handle TypeScript
        exclude: /node_modules/, // Exclude dependency files
      },
    ],
  },
  target: 'node', // Target Node.js environment
  mode: 'production', // Enable production optimizations
  experiments: {
    outputModule: true, // Enable ESM output
  },
};
