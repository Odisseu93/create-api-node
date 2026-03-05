import { runLint } from './lint';
import * as fs from '../utils/fs';

jest.mock('../utils/fs');

describe('runLint', () => {
  const mockedFs = jest.mocked(fs);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should write ESLint and Prettier config files to targetDir', async () => {
    const targetDir = '/path/to/project';

    await runLint({ targetDir, packageManager: 'npm' });

    expect(mockedFs.writeFile).toHaveBeenCalledTimes(2);
    const paths = mockedFs.writeFile.mock.calls.map((c) => c[0]);
    expect(paths.some((p) => p.includes('eslintrc'))).toBe(true);
    expect(paths.some((p) => p.includes('prettierrc'))).toBe(true);
  });

  it('should write content that includes eslint and prettier config', async () => {
    await runLint({ targetDir: '/app', packageManager: 'npm' });

    const contentCalls = mockedFs.writeFile.mock.calls.map((c) => c[1]);
    const allContent = contentCalls.join(' ');
    expect(allContent).toMatch(/eslint|ESLint/i);
    expect(allContent).toMatch(/prettier|Prettier/i);
  });
});
