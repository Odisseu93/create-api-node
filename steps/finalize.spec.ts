import { runFinalize } from './finalize';
import * as logger from '../utils/logger';

jest.mock('../utils/logger');

describe('runFinalize', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call success with a message containing targetDir', async () => {
    await runFinalize({ targetDir: '/path/to/my-api', packageManager: 'npm' });

    expect(logger.success).toHaveBeenCalledTimes(1);
    expect(logger.success).toHaveBeenCalledWith(expect.stringContaining('/path/to/my-api'));
  });

  it('should suggest next steps (e.g. cd and run)', async () => {
    await runFinalize({ targetDir: './my-app', packageManager: 'npm' });

    const message = (logger.success as jest.Mock).mock.calls[0][0];
    expect(message).toMatch(/cd|run|npm|dev|start/i);
  });
});
