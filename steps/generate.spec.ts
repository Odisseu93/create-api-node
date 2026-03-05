import { runGenerate } from './generate';
import * as fs from '../utils/fs';
import * as path from 'path';
import * as os from 'os';
import * as fsNode from 'fs/promises';

jest.mock('../utils/fs');

describe('runGenerate', () => {
  const mockedFs = jest.mocked(fs);
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fsNode.mkdtemp(path.join(os.tmpdir(), 'cna-generate-'));
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await fsNode.rm(tmpDir, { recursive: true, force: true });
  });

  it('should copy template directory to targetDir', async () => {
    const templatePath = path.join(tmpDir, 'tpl');
    const targetDir = path.join(tmpDir, 'out');
    await fsNode.mkdir(templatePath);

    await runGenerate({
      targetDir,
      templateBasePath: templatePath,
      packageManager: 'npm',
    });

    expect(mockedFs.copyDir).toHaveBeenCalledWith(templatePath, targetDir);
  });

  it('should throw when templateBasePath is missing', async () => {
    await expect(
      runGenerate({ targetDir: tmpDir, packageManager: 'npm' }),
    ).rejects.toThrow(/template|base|path/i);
    expect(mockedFs.copyDir).not.toHaveBeenCalled();
  });

  it('should update package.json name with projectName when set', async () => {
    const templatePath = path.join(tmpDir, 'tpl');
    const targetDir = path.join(tmpDir, 'out');
    await fsNode.mkdir(templatePath);
    const packageJsonPath = path.join(targetDir, 'package.json');
    mockedFs.exists.mockResolvedValue(true);
    mockedFs.readFile.mockResolvedValue(JSON.stringify({ name: 'my-api', version: '1.0.0' }));

    await runGenerate({
      targetDir,
      templateBasePath: templatePath,
      projectName: 'my-cool-api',
      packageManager: 'npm',
    });

    expect(mockedFs.readFile).toHaveBeenCalledWith(packageJsonPath);
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
      packageJsonPath,
      expect.stringContaining('"name": "my-cool-api"'),
    );
  });
});
