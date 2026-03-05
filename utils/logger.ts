/**
 * ANSI color codes for terminal output.
 * Red is reserved for errors only.
 */
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[36m'; // cyan, used for info
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';

/**
 * Formatted CLI output with colors. Error is always red.
 */
export function info(message: string): void {
  console.log(`${BLUE}${message}${RESET}`);
}

export function warn(message: string): void {
  console.log(`${YELLOW}⚠ Warning: ${message}${RESET}`);
}

export function error(message: string): void {
  console.error(`${RED}✖ Error: ${message}${RESET}`);
}

export function success(message: string): void {
  console.log(`${GREEN}✓ ${message}${RESET}`);
}

/**
 * Step in progress (e.g. "→ Running Init..."). Dim cyan.
 */
export function step(message: string): void {
  console.log(`${DIM}${BLUE}→ ${message}${RESET}`);
}

/**
 * Title or header (e.g. "CNA — Create Node API"). Bold.
 */
export function title(message: string): void {
  console.log(`${BOLD}${message}${RESET}`);
}

/**
 * Raw green output (e.g. for ASCII art).
 */
export function green(message: string): void {
  console.log(`${GREEN}${message}${RESET}`);
}
