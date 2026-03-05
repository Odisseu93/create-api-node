import * as os from 'os';
import * as path from 'path';
import * as fsNode from 'fs/promises';
import { copyFile, writeFile, mkdir, exists, readFile, readdir, copyDir } from './fs';

describe('fs', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = await fsNode.mkdtemp(path.join(os.tmpdir(), 'cna-fs-'));
  });

  afterEach(async () => {
    await fsNode.rm(tmpDir, { recursive: true, force: true });
  });

  describe('writeFile', () => {
    it('should write content to a file', async () => {
      const file = path.join(tmpDir, 'foo.txt');
      await writeFile(file, 'hello');
      const content = await fsNode.readFile(file, 'utf-8');
      expect(content).toBe('hello');
    });

    it('should create parent directories when needed', async () => {
      const file = path.join(tmpDir, 'a', 'b', 'file.txt');
      await writeFile(file, 'data');
      expect(await exists(file)).toBe(true);
    });
  });

  describe('readFile', () => {
    it('should return file content as string', async () => {
      const file = path.join(tmpDir, 'readme.txt');
      await fsNode.writeFile(file, 'content');
      expect(await readFile(file)).toBe('content');
    });

    it('should throw when file does not exist', async () => {
      await expect(readFile(path.join(tmpDir, 'missing.txt'))).rejects.toThrow();
    });
  });

  describe('exists', () => {
    it('should return true for existing file', async () => {
      const file = path.join(tmpDir, 'x.txt');
      await fsNode.writeFile(file, '');
      expect(await exists(file)).toBe(true);
    });

    it('should return false for non-existing path', async () => {
      expect(await exists(path.join(tmpDir, 'nope'))).toBe(false);
    });
  });

  describe('mkdir', () => {
    it('should create directory', async () => {
      const dir = path.join(tmpDir, 'subdir');
      await mkdir(dir);
      const stat = await fsNode.stat(dir);
      expect(stat.isDirectory()).toBe(true);
    });

    it('should not fail when directory already exists', async () => {
      const dir = path.join(tmpDir, 'sub');
      await mkdir(dir);
      await mkdir(dir);
      expect(await exists(dir)).toBe(true);
    });
  });

  describe('copyFile', () => {
    it('should copy source to destination', async () => {
      const src = path.join(tmpDir, 'src.txt');
      const dest = path.join(tmpDir, 'dest.txt');
      await fsNode.writeFile(src, 'copied content');
      await copyFile(src, dest);
      expect(await readFile(dest)).toBe('copied content');
    });
  });

  describe('readdir', () => {
    it('should return list of entries in directory', async () => {
      await fsNode.writeFile(path.join(tmpDir, 'a.txt'), '');
      await fsNode.writeFile(path.join(tmpDir, 'b.txt'), '');
      const entries = await readdir(tmpDir);
      expect(entries.sort()).toEqual(['a.txt', 'b.txt']);
    });

    it('should return empty array for empty directory', async () => {
      const emptyDir = path.join(tmpDir, 'empty');
      await fsNode.mkdir(emptyDir);
      expect(await readdir(emptyDir)).toEqual([]);
    });
  });

  describe('copyDir', () => {
    it('should copy directory recursively', async () => {
      const src = path.join(tmpDir, 'src');
      await fsNode.mkdir(src);
      await fsNode.mkdir(path.join(src, 'sub'));
      await fsNode.writeFile(path.join(src, 'root.txt'), 'root');
      await fsNode.writeFile(path.join(src, 'sub', 'nested.txt'), 'nested');
      const dest = path.join(tmpDir, 'dest');

      await copyDir(src, dest);

      expect(await readFile(path.join(dest, 'root.txt'))).toBe('root');
      expect(await readFile(path.join(dest, 'sub', 'nested.txt'))).toBe('nested');
    });
  });
});
