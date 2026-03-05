import type { Context } from '../core/context';
import * as path from 'path';
import * as fs from '../utils/fs';

const JEST_CONFIG = `/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
};
`;

/**
 * Writes Jest config into targetDir.
 */
export async function runTest(context: Context): Promise<void> {
  const { targetDir } = context;
  await fs.writeFile(path.join(targetDir, 'jest.config.js'), JEST_CONFIG);
}
