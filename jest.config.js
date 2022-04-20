/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  collectCoverage: false,
  moduleNameMapper: {
    '\\.(css|less|scss|sass|svg|png)$': 'identity-obj-proxy',
  },
  modulePathIgnorePatterns: ['.cache'],
  testEnvironment: 'jsdom',
};
