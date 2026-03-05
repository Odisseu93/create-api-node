import type { Context } from '../core/context';
import { success } from '../utils/logger';

/**
 * Prints success message and next steps (cd into targetDir, npm run dev).
 */
export async function runFinalize(context: Context): Promise<void> {
  const { targetDir } = context;
  success(`Project created at ${targetDir}. Next steps:\n  cd ${targetDir}\n  npm run dev`);
}
