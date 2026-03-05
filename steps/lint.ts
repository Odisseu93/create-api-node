import type { Context } from '../core/context';
import * as path from 'path';
import * as fs from '../utils/fs';

const ESLINTRC = `{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": { "ecmaVersion": 2022, "sourceType": "module" },
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  "env": { "node": true, "es2022": true }
}
`;

const PRETTIERRC = `{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "all"
}
`;

/**
 * Writes ESLint and Prettier config files into targetDir.
 */
export async function runLint(context: Context): Promise<void> {
  const { targetDir } = context;
  await fs.writeFile(path.join(targetDir, '.eslintrc.json'), ESLINTRC);
  await fs.writeFile(path.join(targetDir, '.prettierrc'), PRETTIERRC);
}
