/**
 * Maps low-level errors to user-friendly messages for CLI output.
 */

interface NodeErrnoException extends Error {
  code?: string;
}

/**
 * Returns a short, user-friendly message for a given error.
 * Red is reserved for errors; this message is shown in red by the CLI.
 */
export function getUserFriendlyMessage(err: unknown): string {
  if (err instanceof Error) {
    const nodeErr = err as NodeErrnoException;
    const code = nodeErr.code;
    const msg = err.message;

    if (code === 'EACCES' || code === 'EPERM') {
      return (
        'Permission denied: cannot create or write to the project folder. ' +
        'Check folder permissions or run from a different directory.'
      );
    }

    if (code === 'ENOENT') {
      if (msg.includes('template') || msg.includes('templates')) {
        return 'Template files not found. The CLI may be misinstalled; try reinstalling create-node-api.';
      }
      return `Not found: ${msg}. Check that the path exists and try again.`;
    }

    if (code === 'EEXIST') {
      return 'A file or folder with that name already exists. Choose another project name or remove the existing one.';
    }

    if (msg.includes('Command failed') || msg.includes('npm install') || msg.includes('yarn install') || msg.includes('pnpm install')) {
      return (
        "Install failed. Check your network connection and Node/npm version. " +
        "You can run 'npm install' (or yarn/pnpm) manually inside the project folder and continue from there."
      );
    }

    return msg;
  }

  return String(err);
}
