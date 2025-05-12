import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset to transpile TypeScript
  testEnvironment: 'node', // Sets the environment (Node.js or browser)
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  testMatch: ['**/__tests__/**/*.test.ts'], // Match test file patterns
  clearMocks: true, // Automatically clear mocks
};

export default config;