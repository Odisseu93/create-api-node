import { exec as execCb } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(execCb);

export interface ExecOptions {
  cwd?: string;
}

/**
 * Runs a shell command. Rejects on non-zero exit or stderr (depending on shell).
 */
export async function execCommand(command: string, options: ExecOptions = {}): Promise<void> {
  await execAsync(command, {
    cwd: options.cwd ?? process.cwd(),
    maxBuffer: 10 * 1024 * 1024,
  });
}
