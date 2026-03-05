import { execCommand } from './exec';

import * as childProcess from 'child_process';

jest.mock('child_process', () => {
  const actual = jest.requireActual<typeof import('child_process')>('child_process');
  return {
    ...actual,
    exec: jest.fn(),
  };
});

describe('execCommand', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve when command succeeds', async () => {
    jest.mocked(childProcess.exec).mockImplementation(((cmd: string, opts: unknown, cb?: (err: Error | null, stdout: string, stderr: string) => void) => {
      if (cb) cb(null, 'ok', '');
    }) as typeof childProcess.exec);
    await expect(execCommand('echo hello', { cwd: process.cwd() })).resolves.toBeUndefined();
    expect(childProcess.exec).toHaveBeenCalledWith(
      'echo hello',
      expect.objectContaining({ cwd: process.cwd() }),
      expect.any(Function),
    );
  });

  it('should reject when command fails', async () => {
    jest.mocked(childProcess.exec).mockImplementation(((cmd: string, opts: unknown, cb?: (err: Error | null, stdout: string, stderr: string) => void) => {
      if (cb) cb(new Error('command failed'), '', '');
    }) as typeof childProcess.exec);
    await expect(execCommand('exit 1')).rejects.toThrow('command failed');
  });

  it('should pass cwd to exec', async () => {
    jest.mocked(childProcess.exec).mockImplementation(((cmd: string, opts: unknown, cb?: (err: Error | null, stdout: string, stderr: string) => void) => {
      expect((opts as { cwd?: string }).cwd).toBe('/some/dir');
      if (cb) cb(null, '', '');
    }) as typeof childProcess.exec);
    await execCommand('npm install', { cwd: '/some/dir' });
  });
});
