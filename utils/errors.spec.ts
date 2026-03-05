import { getUserFriendlyMessage } from './errors';

describe('getUserFriendlyMessage', () => {
  it('returns permission-denied message for EACCES', () => {
    const err = new Error('EACCES: permission denied, mkdir') as Error & { code?: string };
    err.code = 'EACCES';
    expect(getUserFriendlyMessage(err)).toContain('Permission denied');
    expect(getUserFriendlyMessage(err)).toContain('cannot create or write');
  });

  it('returns permission-denied message for EPERM', () => {
    const err = new Error('operation not permitted') as Error & { code?: string };
    err.code = 'EPERM';
    expect(getUserFriendlyMessage(err)).toContain('Permission denied');
  });

  it('returns template-not-found message for ENOENT with template in message', () => {
    const err = new Error('ENOENT: no such file, open templates/base/package.json') as Error & { code?: string };
    err.code = 'ENOENT';
    expect(getUserFriendlyMessage(err)).toContain('Template files not found');
  });

  it('returns not-found message for ENOENT without template', () => {
    const err = new Error('ENOENT: no such file, open /foo/bar') as Error & { code?: string };
    err.code = 'ENOENT';
    expect(getUserFriendlyMessage(err)).toContain('Not found');
  });

  it('returns install-failed message when message includes Command failed', () => {
    const err = new Error('Command failed: npm install --some-args');
    expect(getUserFriendlyMessage(err)).toContain('Install failed');
    expect(getUserFriendlyMessage(err)).toContain('npm install');
  });

  it('returns install-failed message when message includes npm install', () => {
    const err = new Error('npm install exited with code 1');
    expect(getUserFriendlyMessage(err)).toContain('Install failed');
  });

  it('returns EEXIST message for code EEXIST', () => {
    const err = new Error('File exists') as Error & { code?: string };
    err.code = 'EEXIST';
    expect(getUserFriendlyMessage(err)).toContain('already exists');
  });

  it('returns original message for generic Error', () => {
    const err = new Error('Something went wrong');
    expect(getUserFriendlyMessage(err)).toBe('Something went wrong');
  });

  it('returns string for non-Error thrown value', () => {
    expect(getUserFriendlyMessage('oops')).toBe('oops');
  });
});
