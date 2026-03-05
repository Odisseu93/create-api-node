import type { Context } from '../core/context';
import { runInit } from './init';
import * as fs from '../utils/fs';
import * as path from 'path';
import * as os from 'os';
import * as fsNode from 'fs/promises';

jest.mock('../utils/fs');

describe('runInit', () => {
  const mockedFs = jest.mocked(fs);
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fsNode.mkdtemp(path.join(os.tmpdir(), 'can-init-'));
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await fsNode.rm(tmpDir, { recursive: true, force: true });
  });

  it('should create targetDir when it does not exist', async () => {
    const target = path.join(tmpDir, 'new-dir');
    mockedFs.exists.mockResolvedValue(false);

    await runInit(createContext(target));

    expect(mockedFs.mkdir).toHaveBeenCalledWith(target);
  });

  it('should not create targetDir when it exists and is empty', async () => {
    mockedFs.exists.mockResolvedValue(true);
    mockedFs.readdir.mockResolvedValue([]);

    await runInit(createContext(tmpDir));

    expect(mockedFs.mkdir).not.toHaveBeenCalled();
  });

  it('should throw when targetDir exists and is not empty', async () => {
    mockedFs.exists.mockResolvedValue(true);
    mockedFs.readdir.mockResolvedValue(['package.json', 'src']);

    await expect(runInit(createContext(tmpDir))).rejects.toThrow(/not empty|already exists/i);
    expect(mockedFs.mkdir).not.toHaveBeenCalled();
  });
});

function createContext(targetDir: string): Context {
  return { targetDir, packageManager: 'npm' };
}
