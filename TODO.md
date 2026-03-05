# Todolist — CAN (Create API Node) CLI Development

Goal: automate creation of a Node + Express + TypeScript API via `npx create-api-node` (or `npx can`). The CLI installs dependencies, configures TypeScript, ESLint/Prettier, Jest, and generates `package.json`, then exits.

**Application name:** CAN - Create API Node (package: **create-api-node**)  
**Package:** `create-api-node`  
**Commands:** `npx create-api-node <dir>` or `npx can <dir>`

---

## TDD — Development Rule

We follow **TDD (Test-Driven Development)**:

1. **Write the test first** — For each feature (step, util, runner), create the `*.spec.ts` / `*.test.ts` file and describe the expected behavior.
2. **See the test fail** — Run the tests (Red).
3. **Implement the minimum** — Write production code until the test passes (Green).
4. **Refactor** — Improve the code while keeping tests green.

Do not commit new implementation without the corresponding test. For each code item in the phases below: **test first, implementation second.**

---

## Phase 1 — Project Foundation

- [x] Initialize CLI `package.json` (package name `create-api-node`, bin `create-api-node` + `can`, scripts, dependencies)
- [x] Configure TypeScript (`tsconfig.json`) for bin, core, steps, utils
- [x] Configure ESLint + Prettier in the CLI repo itself
- [x] Configure Jest in the CLI repo (test, test:watch, test:coverage)
- [x] Create folder structure: `bin/`, `core/`, `steps/`, `templates/`, `utils/`

---

## Phase 2 — Core and Entry

(For each item: write the test first, then the implementation.)

- [x] **core/context.ts** — Test: creation and fields; impl: `Context` type/interface (targetDir, projectName, packageManager, etc.)
- [x] **core/runner.ts** — Test: step order, error handling; impl: orchestrate pipeline
- [x] **bin/index.ts** — Test: arg parsing; impl: entrypoint, create context, call runner (steps empty for now)
- [x] **utils/logger.ts** — Test: formatted output (console mock); impl: info, warn, error, success
- [x] **utils/exec.ts** — Test: shell invocation, success/failure; impl: run commands safely
- [x] **utils/fs.ts** — Test: copy, write, mkdir, exists, readFile; impl: file helpers

---

## Phase 3 — Pipeline Steps

(For each step: test first — mocked context, expectations; then implementation.)

- [x] **steps/init.ts** — Test: dir validation, existing dir; impl: validate/create target directory
- [ ] **steps/prompts.ts** (optional) — Test: return value from input; impl: ask projectName, packageManager
- [x] **steps/generate.ts** — Test: files copied/generated in targetDir; impl: copy from `templates/base/`
- [x] **steps/install.ts** — Test: exec called with correct command; impl: run npm/yarn/pnpm install
- [x] **steps/lint.ts** — Test: config files and scripts written; impl: ESLint + Prettier in generated project
- [x] **steps/test.ts** — Test: jest.config and scripts; impl: configure Jest in generated project
- [x] **steps/finalize.ts** — Test: logger called with success message; impl: message and next steps
- [x] **bin/index.ts** — Wire all steps in pipeline with templateBasePath

---

## Phase 4 — Base Templates

- [x] **templates/base/package.json** — Scripts (build, dev, start, lint, lint:fix, format, test, test:watch)
- [x] **templates/base/tsconfig.json** — TypeScript config for generated API (strict, ES2022, outDir dist, etc.)
- [x] **templates/base/src/** — Minimal structure: `app.ts`, `index.ts`, `routes/health.ts`
- [x] **templates/base/.eslintrc.json** — ESLint config for generated project
- [x] **templates/base/.prettierrc** — Prettier config
- [x] **templates/base/jest.config.js** — Jest config for generated project
- [x] **templates/base/.env.example** — Example env vars (PORT, NODE_ENV)
- [x] **templates/base/README.md** — Minimal instructions for generated project
- [x] **generate.ts** — Replace placeholders: package.json `name` from projectName or targetDir basename

---

## Phase 5 — Publish and npx Usage

- [x] Ensure CLI `package.json` has `"bin": { "create-api-node": "./dist/bin/index.js", "can": "./dist/bin/index.js" }`
- [x] Build: script that compiles TypeScript to `dist/` and points bin to `dist/bin/index.js`
- [ ] Test locally with `npm link` and `npx create-api-node` (or `npx can`) from another directory
- [x] Publish to npm and document install/usage in README

---

## Phase 6 — Polish and Documentation

(Tests are already written first in Phases 2 and 3; this phase focuses on coverage and UX.)

- [x] Review coverage: all steps, runner, and utils have corresponding tests
- [x] User-friendly error handling (dir already exists, permission denied, npm failed, etc.)
- [x] CLI README with usage, templates, development scripts, and project structure

---

## Suggested Implementation Order (TDD)

1. Phase 1 (foundation) — no product TDD; only Jest config to run tests.
2. Phase 2 (core + utils) — **for each file: write `*.spec.ts` first, then implementation.**
3. Phase 3 (steps) — **for each step: write `*.spec.ts` first, then implementation.**
4. Phase 4 (templates) — in parallel or right after generate (templates are data; generate is tested in Phase 3).
5. Phase 5 (npx/publish).
6. Phase 6 (polish and documentation).

---

*Pipeline: **prompts (name, template) → init → generate → install → lint config → test config → finalize***
