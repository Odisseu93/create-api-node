/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['bin/**/*.ts', 'core/**/*.ts', 'steps/**/*.ts', 'utils/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '\\.spec\\.ts$', '\\.test\\.ts$'],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80,
    },
  },
};
