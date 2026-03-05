/**
 * Simple CLI spinner. Call startSpinner(), then stopSpinner() when done.
 */
const FRAMES = ['|', '/', '-', '\\'];
const INTERVAL_MS = 80;
const DIM = '\x1b[2m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

let timer: ReturnType<typeof setInterval> | null = null;
let currentMessage = '';

function clearLine(): void {
  process.stdout.write('\r\x1b[K');
}

export function startSpinner(message = 'Loading'): void {
  if (timer) return;
  currentMessage = message;
  let i = 0;
  timer = setInterval(() => {
    clearLine();
    process.stdout.write(`\r  ${DIM}${CYAN}${FRAMES[i % FRAMES.length]} ${currentMessage}...${RESET}`);
    i += 1;
  }, INTERVAL_MS);
}

export function stopSpinner(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
    clearLine();
  }
}
