import type { Context } from './context';

export type Step = (context: Context) => Promise<void>;

/**
 * Runs the given steps in order with the same context. Stops and rethrows on first step error.
 */
export async function runPipeline(context: Context, steps: Step[]): Promise<void> {
  for (const step of steps) {
    await step(context);
  }
}
