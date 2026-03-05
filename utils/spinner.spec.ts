import { startSpinner, stopSpinner } from './spinner';

describe('spinner', () => {
  beforeEach(() => {
    stopSpinner();
  });

  it('should start and stop without throwing', () => {
    startSpinner('Test');
    expect(() => stopSpinner()).not.toThrow();
  });

  it('should allow custom message', () => {
    startSpinner('Custom');
    stopSpinner();
  });
});
