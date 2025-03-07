// jest.config.cjs
const path = require('path');
console.log('Using custom mockAssets for assets');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setUpTests.ts'],
  moduleNameMapper: {
    '\\.(css|jpg|jpeg|png|gif|svg)$': '<rootDir>/src/--mocks--/mockAssets.js',
  },
  rootDir: '.',
};