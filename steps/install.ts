import type { Context } from '../core/context';
import { execCommand } from '../utils/exec';

/**
 * Runs package manager install in targetDir (npm install, yarn install, or pnpm install).
 */
export async function runInstall(context: Context): Promise<void> {
  const { targetDir, packageManager } = context;
  const command = packageManager === 'yarn' ? 'yarn install' : packageManager === 'pnpm' ? 'pnpm install' : 'npm install';
  await execCommand(command, { cwd: targetDir });
}
