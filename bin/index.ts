#!/usr/bin/env node
/**
 * CAN - Create API Node (create-api-node)
 * CLI entrypoint: parse args, create context, invoke runner.
 */

import * as path from 'path';
import { createContext } from '../core/context';
import type { Context } from '../core/context';
import { TEMPLATES } from '../core/templates';
import { runInit } from '../steps/init';
import { runGenerate } from '../steps/generate';
import { runInstall } from '../steps/install';
import { runLint } from '../steps/lint';
import { runTest } from '../steps/test';
import { runFinalize } from '../steps/finalize';
import { info, success, warn, step, title, error as logError } from '../utils/logger';
import { startSpinner, stopSpinner } from '../utils/spinner';
import { ask, askTemplateChoice } from '../utils/prompt';
import { getUserFriendlyMessage } from '../utils/errors';
import * as fs from '../utils/fs';

const TEMPLATES_DIR = path.join(__dirname, '..', '..', 'templates');

type Step = (context: Context) => Promise<void>;

const NAMED_STEPS: { name: string; run: Step }[] = [
  { name: 'Init', run: runInit },
  { name: 'Generate', run: runGenerate },
  { name: 'Install', run: runInstall },
  { name: 'Lint config', run: runLint },
  { name: 'Test config', run: runTest },
  { name: 'Finalize', run: runFinalize },
];

/**
 * Entrypoint for the CLI. Prompts for project name and template, then runs the pipeline.
 */
export async function main(argv: string[]): Promise<void> {
  const args = argv.slice(2);
  const defaultProjectName = args[0] ?? 'my-api';

  title('\nCAN - Create API Node\n');
  info('Scaffolding CLI for Node + TypeScript APIs.\n');

  let projectName = await ask('Project name', defaultProjectName);
  if (!projectName) {
    throw new Error('Project name is required.');
  }

  let targetDir = path.join(process.cwd(), projectName);
  while (await fs.exists(targetDir) && (await fs.readdir(targetDir)).length > 0) {
    warn(`The folder "${projectName}" already exists and is not empty.`);
    const newName = await ask('Enter a different project name');
    if (!newName) {
      throw new Error('Cancelled. Choose a different project name and run the command again.');
    }
    projectName = newName;
    targetDir = path.join(process.cwd(), projectName);
  }

  const selectedTemplate = await askTemplateChoice(TEMPLATES);
  const templateBasePath = path.join(TEMPLATES_DIR, selectedTemplate.path);

  const context = createContext({
    targetDir,
    projectName,
    templateBasePath,
  });

  info(`\n  Project: ${projectName}\n  Template: ${selectedTemplate.name}\n  Target: ${targetDir}\n`);

  for (const { name, run } of NAMED_STEPS) {
    try {
      step(`Running ${name}...`);
      startSpinner(name);
      await run(context);
      stopSpinner();
      success(`${name} done`);
    } catch (err) {
      stopSpinner();
      throw err;
    }
  }
}

if (require.main === module) {
  main(process.argv).catch((err) => {
    const message = getUserFriendlyMessage(err);
    logError(message);
    if (err instanceof Error && err.stack && process.env.DEBUG) {
      console.error('\x1b[2m\x1b[31m' + err.stack + '\x1b[0m');
    }
    process.exit(1);
  });
}
