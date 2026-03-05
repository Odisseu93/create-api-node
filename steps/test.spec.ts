import { runTest } from './test';
import * as fs from '../utils/fs';

jest.mock('../utils/fs');

describe('runTest', () => {
  const mockedFs = jest.mocked(fs);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write Jest config to targetDir', async () => {
    const targetDir = '/path/to/project';

    await runTest({ targetDir, packageManager: 'npm' });

    expect(mockedFs.writeFile).toHaveBeenCalled();
    const paths = mockedFs.writeFile.mock.calls.map((c) => c[0]);
    expect(paths.some((p) => p.includes('jest.config') || p.endsWith('jest.config.js'))).toBe(true);
  });

  it('should write content that includes jest config', async () => {
    await runTest({ targetDir: '/app', packageManager: 'npm' });

    const content = mockedFs.writeFile.mock.calls.map((c) => c[1]).join(' ');
    expect(content).toMatch(/jest|ts-jest/i);
  });
});
