import type { Context } from '../core/context';
import * as fs from '../utils/fs';

/**
 * Validates and prepares targetDir: creates it if missing, throws if it exists and is not empty.
 */
export async function runInit(context: Context): Promise<void> {
  const { targetDir } = context;
  const dirExists = await fs.exists(targetDir);
  if (!dirExists) {
    await fs.mkdir(targetDir);
    return;
  }
  const entries = await fs.readdir(targetDir);
  if (entries.length > 0) {
    throw new Error(`Directory "${targetDir}" already exists and is not empty. Choose another path or remove it.`);
  }
}
