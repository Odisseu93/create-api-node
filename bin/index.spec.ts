import * as path from 'path';
import { main } from './index';

jest.mock('../core/context', () => ({
  createContext: jest.fn((opts: { targetDir: string; projectName?: string; templateBasePath?: string }) => ({
    ...opts,
    packageManager: 'npm',
  })),
}));

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  success: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  step: jest.fn(),
  title: jest.fn(),
  green: jest.fn(),
}));

jest.mock('../utils/spinner', () => ({
  startSpinner: jest.fn(),
  stopSpinner: jest.fn(),
}));

jest.mock('../utils/fs', () => ({
  exists: jest.fn().mockResolvedValue(false),
  readdir: jest.fn().mockResolvedValue([]),
  mkdir: jest.fn().mockResolvedValue(undefined),
  writeFile: jest.fn().mockResolvedValue(undefined),
  readFile: jest.fn().mockResolvedValue(''),
  copyDir: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../utils/prompt', () => ({
  ask: jest.fn().mockResolvedValue('my-api'),
  askTemplateChoice: jest.fn().mockResolvedValue({ id: 'base', name: 'base', description: 'Node + Express + TypeScript', path: 'base' }),
}));

jest.mock('../steps/init', () => ({ runInit: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../steps/generate', () => ({ runGenerate: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../steps/install', () => ({ runInstall: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../steps/lint', () => ({ runLint: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../steps/test', () => ({ runTest: jest.fn().mockResolvedValue(undefined) }));
jest.mock('../steps/finalize', () => ({ runFinalize: jest.fn().mockResolvedValue(undefined) }));

import { createContext } from '../core/context';
import { ask, askTemplateChoice } from '../utils/prompt';
import * as fs from '../utils/fs';
import { runInit } from '../steps/init';
import { runGenerate } from '../steps/generate';
import { runInstall } from '../steps/install';
import { runLint } from '../steps/lint';
import { runTest } from '../steps/test';
import { runFinalize } from '../steps/finalize';

describe('CNA CLI main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(ask).mockResolvedValue('my-api');
    jest.mocked(askTemplateChoice).mockResolvedValue({ id: 'base', name: 'base', description: 'Node + Express + TypeScript', path: 'base' });
    jest.mocked(fs.exists).mockResolvedValue(false);
    jest.mocked(fs.readdir).mockResolvedValue([]);
  });

  it('should prompt for project name and use it for targetDir and context', async () => {
    jest.mocked(ask).mockResolvedValueOnce('my-app');
    await main(['node', 'index.js', 'default-name']);

    expect(ask).toHaveBeenCalledWith('Project name', 'default-name');
    expect(createContext).toHaveBeenCalledWith(
      expect.objectContaining({
        targetDir: path.join(process.cwd(), 'my-app'),
        projectName: 'my-app',
        templateBasePath: expect.stringContaining('base'),
      }),
    );
  });

  it('should use default project name when no args', async () => {
    await main(['node', 'index.js']);

    expect(ask).toHaveBeenCalledWith('Project name', 'my-api');
    expect(createContext).toHaveBeenCalledWith(
      expect.objectContaining({
        targetDir: path.join(process.cwd(), 'my-api'),
        projectName: 'my-api',
      }),
    );
  });

  it('should prompt for template and run all steps with context', async () => {
    await main(['node', 'index.js']);

    expect(askTemplateChoice).toHaveBeenCalled();
    const context = (createContext as jest.Mock).mock.results[0].value;
    expect(runInit).toHaveBeenCalledWith(context);
    expect(runGenerate).toHaveBeenCalledWith(context);
    expect(runInstall).toHaveBeenCalledWith(context);
    expect(runLint).toHaveBeenCalledWith(context);
    expect(runTest).toHaveBeenCalledWith(context);
    expect(runFinalize).toHaveBeenCalledWith(context);
  });

  it('should re-prompt for project name when target folder already exists and is not empty', async () => {
    jest.mocked(fs.exists)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false);
    jest.mocked(fs.readdir).mockResolvedValueOnce(['package.json', 'src']);
    jest.mocked(ask)
      .mockResolvedValueOnce('my-api')
      .mockResolvedValueOnce('my-new-api');

    await main(['node', 'index.js']);

    expect(ask).toHaveBeenCalledTimes(2);
    expect(ask).toHaveBeenNthCalledWith(1, 'Project name', 'my-api');
    expect(ask).toHaveBeenNthCalledWith(2, 'Enter a different project name');
    expect(createContext).toHaveBeenCalledWith(
      expect.objectContaining({
        projectName: 'my-new-api',
        targetDir: path.join(process.cwd(), 'my-new-api'),
      }),
    );
  });
});
