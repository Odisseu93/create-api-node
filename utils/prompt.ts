import * as readline from 'readline';
import type { TemplateInfo } from '../core/templates';

/**
 * Asks a single question and returns the trimmed answer.
 */
export function ask(question: string, defaultValue?: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const prompt = defaultValue !== undefined ? `${question} (${defaultValue}): ` : `${question}: `;
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      const trimmed = answer.trim();
      resolve(trimmed !== '' ? trimmed : (defaultValue ?? ''));
    });
  });
}

/**
 * Shows the list of templates with descriptions and returns the selected one.
 * User enters the number (1-based). Invalid input defaults to first template.
 */
export function askTemplateChoice(templates: TemplateInfo[]): Promise<TemplateInfo> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const lines = [
    '',
    'Choose a template:',
    ...templates.map((t, i) => `  ${i + 1}. ${t.name} — ${t.description}`),
    '',
  ];
  console.log(lines.join('\n'));
  const prompt = `Enter number (1-${templates.length}) [1]: `;
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      const num = parseInt(answer.trim(), 10);
      const index = (Number.isNaN(num) ? 1 : num) - 1;
      const clamped = Math.max(0, Math.min(index, templates.length - 1));
      resolve(templates[clamped]!);
    });
  });
}
