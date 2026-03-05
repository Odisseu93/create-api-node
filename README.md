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
├── utils/         # Helpers: fs, exec, logger, prompt, spinner
├── package.json
├── tsconfig.json
└── jest.config.cjs
```

## License

MIT
