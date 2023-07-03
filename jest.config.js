/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/?(*.)+(test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
};