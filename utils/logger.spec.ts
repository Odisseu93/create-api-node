import { info, warn, error, success, step, title } from './logger';

describe('logger', () => {
  let stdout: jest.SpyInstance;
  let stderr: jest.SpyInstance;

  beforeEach(() => {
    stdout = jest.spyOn(console, 'log').mockImplementation();
    stderr = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    stdout.mockRestore();
    stderr.mockRestore();
  });

  it('info should log to console.log', () => {
    info('hello');
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('hello'));
    expect(stdout).toHaveBeenCalledTimes(1);
  });

  it('warn should log to console.log with prefix', () => {
    warn('warning message');
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('warning message'));
  });

  it('error should log to console.error', () => {
    error('failed');
    expect(stderr).toHaveBeenCalledWith(expect.stringContaining('failed'));
  });

  it('success should log to console.log', () => {
    success('done');
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('done'));
  });

  it('step should log with "Running"', () => {
    step('Running Init...');
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('Running Init'));
  });

  it('title should log the message', () => {
    title('CAN');
    expect(stdout).toHaveBeenCalledWith(expect.stringContaining('CAN'));
  });
});
