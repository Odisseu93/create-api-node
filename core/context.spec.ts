import { createContext, type Context } from './context';

describe('createContext', () => {
  it('should return a context with targetDir and default packageManager', () => {
    const ctx = createContext({ targetDir: '/path/to/app' });
    expect(ctx.targetDir).toBe('/path/to/app');
    expect(ctx.packageManager).toBe('npm');
  });

  it('should accept projectName and packageManager', () => {
    const ctx = createContext({
      targetDir: '/tmp/my-api',
      projectName: 'my-api',
      packageManager: 'pnpm',
    });
    expect(ctx.targetDir).toBe('/tmp/my-api');
    expect(ctx.projectName).toBe('my-api');
    expect(ctx.packageManager).toBe('pnpm');
  });

  it('should allow packageManager yarn', () => {
    const ctx = createContext({ targetDir: '.', packageManager: 'yarn' });
    expect(ctx.packageManager).toBe('yarn');
  });
});

describe('Context type', () => {
  it('should be usable as readonly state', () => {
    const ctx: Context = createContext({ targetDir: '/app' });
    expect(ctx).toHaveProperty('targetDir');
    expect(ctx).toHaveProperty('packageManager');
  });
});
