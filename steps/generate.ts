import * as path from 'path';
import type { Context } from '../core/context';
import * as fs from '../utils/fs';

/**
 * Copies templates/base into targetDir and replaces placeholders (e.g. project name in package.json).
 * Requires context.templateBasePath to be set.
 */
export async function runGenerate(context: Context): Promise<void> {
  const { targetDir, templateBasePath, projectName } = context;
  if (!templateBasePath) {
    throw new Error('templateBasePath is not set on context. Cannot run generate step.');
  }
  await fs.copyDir(templateBasePath, targetDir);
  const name = projectName ?? path.basename(path.resolve(targetDir)) ?? 'my-api';
  const packagePath = path.join(targetDir, 'package.json');
  const existsPackage = await fs.exists(packagePath);
  if (existsPackage) {
    const raw = await fs.readFile(packagePath);
    const pkg = JSON.parse(raw) as { name?: string; [key: string]: unknown };
    pkg.name = name;
    await fs.writeFile(packagePath, JSON.stringify(pkg, null, 2));
  }
}
