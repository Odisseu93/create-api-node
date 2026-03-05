/**
 * Shared pipeline state. Steps receive and may read/update context.
 */
export interface Context {
  targetDir: string;
  projectName?: string;
  packageManager: 'npm' | 'yarn' | 'pnpm';
  /** Path to templates/base (set by CLI entrypoint). */
  templateBasePath?: string;
}

export interface CreateContextOptions {
  targetDir: string;
  projectName?: string;
  packageManager?: 'npm' | 'yarn' | 'pnpm';
  templateBasePath?: string;
}

/**
 * Creates a new context with defaults (packageManager: 'npm').
 */
export function createContext(options: CreateContextOptions): Context {
  return {
    targetDir: options.targetDir,
    projectName: options.projectName,
    packageManager: options.packageManager ?? 'npm',
    templateBasePath: options.templateBasePath,
  };
}
