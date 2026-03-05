import type { Context } from './context';
import { runPipeline } from './runner';

describe('runPipeline', () => {
  it('should run steps in order', async () => {
    const order: number[] = [];
    const step1 = jest.fn().mockImplementation(async () => {
      order.push(1);
    });
    const step2 = jest.fn().mockImplementation(async () => {
      order.push(2);
    });
    const ctx: Context = { targetDir: '/tmp/app', packageManager: 'npm' };

    await runPipeline(ctx, [step1, step2]);

    expect(step1).toHaveBeenCalledWith(ctx);
    expect(step2).toHaveBeenCalledWith(ctx);
    expect(order).toEqual([1, 2]);
  });

  it('should stop and rethrow when a step throws', async () => {
    const step1 = jest.fn().mockResolvedValue(undefined);
    const step2 = jest.fn().mockRejectedValue(new Error('step failed'));
    const step3 = jest.fn();
    const ctx: Context = { targetDir: '/tmp/app', packageManager: 'npm' };

    await expect(runPipeline(ctx, [step1, step2, step3])).rejects.toThrow('step failed');
    expect(step1).toHaveBeenCalled();
    expect(step2).toHaveBeenCalled();
    expect(step3).not.toHaveBeenCalled();
  });

  it('should pass the same context to all steps', async () => {
    const step = jest.fn().mockResolvedValue(undefined);
    const ctx: Context = { targetDir: '/path', projectName: 'my-app', packageManager: 'yarn' };

    await runPipeline(ctx, [step]);

    expect(step).toHaveBeenCalledWith(ctx);
  });
});
