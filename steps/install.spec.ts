import { runInstall } from './install';
import * as exec from '../utils/exec';

jest.mock('../utils/exec');

describe('runInstall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should run npm install in targetDir when packageManager is npm', async () => {
    await runInstall({
      targetDir: '/path/to/project',
      packageManager: 'npm',
    });

    expect(exec.execCommand).toHaveBeenCalledWith('npm install', {
      cwd: '/path/to/project',
    });
  });

  it('should run yarn install when packageManager is yarn', async () => {
    await runInstall({
      targetDir: '/app',
      packageManager: 'yarn',
    });

    expect(exec.execCommand).toHaveBeenCalledWith('yarn install', { cwd: '/app' });
  });

  it('should run pnpm install when packageManager is pnpm', async () => {
    await runInstall({
      targetDir: '/app',
      packageManager: 'pnpm',
    });

    expect(exec.execCommand).toHaveBeenCalledWith('pnpm install', { cwd: '/app' });
  });

  it('should throw with user-friendly message when install fails', async () => {
    jest.mocked(exec.execCommand).mockRejectedValueOnce(new Error('Command failed: npm install'));

    await expect(runInstall({ targetDir: '/app', packageManager: 'npm' })).rejects.toMatchObject({
      message: expect.stringMatching(/Install failed. .+ Run 'npm install' manually/),
    });
  });
});
