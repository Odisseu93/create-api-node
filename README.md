# CNA — Create Node API

**CNA** is a scaffolding CLI (similar to Create React App or Vite) that generates a Node + TypeScript API from a chosen template. It sets up the project folder, installs dependencies, and configures ESLint, Prettier, and Jest so you can start coding right away.

## Features

- **Interactive prompts** — Project name and template selection
- **Three templates** — Express (base), NestJS, or VkrunJS
- **Ready-to-run** — TypeScript, lint, format, and test configs included in the generated project
- **Single command** — From zero to a runnable API in one go

## Prerequisites

- **Node.js** >= 18
- **npm**, **yarn**, or **pnpm** (the CLI uses npm by default for the generated project)

## Usage

Create a new API project in the current directory. You can pass an optional default project name; the CLI will prompt for confirmation or let you type another name.

```bash
# Using npx (recommended)
npx create-node-api
npx create-node-api my-app

# Short name
npx cna
npx cna my-app
```

### What happens

1. **Project name** — You're asked for a project name (default: `my-api` or the argument you passed). If a folder with that name already exists and is not empty, you'll be prompted to choose another name.
2. **Template** — You choose one of the available templates (see below).
3. **Pipeline** — The CLI runs: init (creates/validates folder), generate (copies template and sets package name), install (runs the package manager), lint config (writes ESLint/Prettier), test config (writes Jest), and finalize (prints success and next steps).
4. **Next steps** — You get the exact `cd` and `npm run dev` commands to start the new project.

## Templates

| Template | Description |
|--------|-------------|
| **base** | Node + Express + TypeScript API with ESLint, Prettier, and Jest. Minimal structure: `app.ts`, `index.ts`, `routes/health`. |
| **nest** | NestJS API with TypeScript: modules, decorators, CLI. Includes `app.module`, controller, service, and `GET /` plus `GET /health`. |
| **vkrun** | [VkrunJS](https://www.vkrunjs.org/documentation/introduction) API with TypeScript. Opinion-free, scalable. Same tooling (ESLint, Prettier, Jest). |

All templates target **Node >= 20** and include a health-check route and `npm run dev` / `npm run build` / `npm start` scripts.

## Development (CLI repo)

Clone the repo, install dependencies, then use the scripts below. Build the CLI before running it locally.

```bash
npm install
npm run build
node dist/bin/index.js
# or
npm start
```

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run dev` | Watch mode (recompile on change) |
| `npm start` | Run the CLI (`node dist/bin/index.js`) |
| `npm test` | Run Jest |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:coverage` | Jest with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run format` | Prettier on `bin/`, `core/`, `steps/`, `utils/` |

## Project structure

```
├── bin/           # CLI entrypoint (prompts, pipeline orchestration)
├── core/          # Context, runner, templates registry
├── steps/         # Pipeline steps: init, generate, install, lint, test, finalize
├── templates/     # Project templates
│   ├── base/      # Express + TypeScript
│   ├── nest/      # NestJS
│   └── vkrun/     # VkrunJS
├── utils/         # Helpers: fs, exec, logger, prompt, spinner, errors
├── package.json
├── tsconfig.json
└── jest.config.cjs
```

## Architecture

The CLI follows a **task-based pipeline**: the entrypoint collects input via prompts, builds a shared **context**, then runs a fixed sequence of **steps**. Each step receives the same context and can fail (aborting the run).

### Pipeline order

1. **Init** — Validates or creates the target directory; fails if it already exists and is not empty.
2. **Generate** — Copies the chosen template into the target dir and sets the project name in `package.json`.
3. **Install** — Runs the package manager (`npm` / `yarn` / `pnpm`) in the generated project.
4. **Lint config** — Writes `.eslintrc.json` and `.prettierrc` into the generated project.
5. **Test config** — Writes `jest.config.js` into the generated project.
6. **Finalize** — Prints success and next steps (`cd <dir>`, `npm run dev`).

The **runner** (orchestration in `bin/index.ts`) runs these steps in order; no branching, only one path. Conditionals (e.g. which template) live inside steps or the entrypoint.

### Dependency rules

- **bin/** — Entrypoint only. Imports from `core/`, `steps/`, `utils/`. No business logic; only prompts, context creation, and step invocation.
- **core/** — Shared state and registry. `context.ts` holds `targetDir`, `projectName`, `packageManager`, `templateBasePath`. `runner.ts` runs a list of steps. `templates.ts` defines available templates. Core does not import from `bin/` or `steps/`.
- **steps/** — Single-responsibility functions `(context) => Promise<void>`. Import from `core/context` and `utils/` (fs, exec, logger). Do not import from `bin/`. On error they throw; the entrypoint catches and shows a user-friendly message (via `utils/errors`).
- **utils/** — Pure helpers (fs, exec, logger, prompt, spinner, errors). No imports from `core/` or `steps/`. Reusable and easy to test with mocks.
- **templates/** — Static files only. No application code; generation logic lives in `steps/generate.ts`.

### Step contract

Every step exports a function:

```ts
(context: Context) => Promise<void>
```

It may read or rely on `context` fields; it should not depend on Express/HTTP. On failure it throws; the CLI maps errors to user-facing messages (permission denied, install failed, etc.) and exits with code 1.

### Principles

- **Modular** — One step, one job. New steps (e.g. a new config writer) can be added without changing others.
- **Pipeline** — Single, explicit execution order. No complex control flow in the runner.
- **Testable** — Steps and utils are unit-tested with mocked `fs` and `exec`; the entrypoint is tested with mocked steps and prompts.

## Publishing (maintainers)

Before publishing to npm:

1. Run `npm run build` (or rely on `prepublishOnly`, which runs it automatically on `npm publish`).
2. Ensure `package.json` has the desired `version` and that `files` (e.g. `dist`, `templates`) are correct.
3. Run `npm publish` (requires an npm account and login with `npm login`).

Optional: add `repository`, `homepage`, and `bugs` to `package.json` so the npm package page shows links to the repo and issue tracker.

## License

MIT
