import type { Context } from '../core/context';
import { execCommand } from '../utils/exec';

/**
 * Runs package manager install in targetDir (npm install, yarn install, or pnpm install).
 * Throws with a user-friendly message on failure (network, permission, or command error).
 */
export async function runInstall(context: Context): Promise<void> {
  const { targetDir, packageManager } = context;
  const command = packageManager === 'yarn' ? 'yarn install' : packageManager === 'pnpm' ? 'pnpm install' : 'npm install';
  try {
    await execCommand(command, { cwd: targetDir });
  } catch (err) {
    const runManually = `Run '${command}' manually inside the project folder and continue from there.`;
    const friendly =
      'Install failed. Check your network connection and Node/npm version. ' + runManually;
    throw Object.assign(err instanceof Error ? err : new Error(String(err)), { message: friendly });
  }
}
