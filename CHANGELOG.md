# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.4] - 2026-03-05

### Changed

- Version bump for release (0.1.3 already published on npm). CHANGELOG and repo aligned with 0.1.3 content; this release publishes the current state as 0.1.4.

## [0.1.3] - 2026-03-05

### Changed

- **Branding:** Binary `cna` replaced by `can`; keyword and docs updated to CAN / Create API Node only.
- **CLI UI:** Removed ASCII art logo; startup now shows plain text (title and description).
- README: add LICENSE link in License section.
- Rule: merge to main only via PR (11-git-operations.mdc).
- Release workflow: add workflow_dispatch with dry_run option to test publish without publishing.

### Added

- Rule 14-github-repo-settings.mdc documenting GitHub Settings (branches, environments, actions, rulesets).

### Fixed

- Test temp dir prefixes and TODO/docs no longer reference `cna` or CNA.
- CI release workflow: dry_run input comparison (workflow_dispatch inputs are strings).

## [0.1.2] - 2026-03-05

### Changed

- Version bump for npm re-publish (0.1.1 already published; no code changes).

## [0.1.1] - 2025-03-05

### Changed

- Product name updated to **CAN - Create API Node** (was CNA — Create Node API). Package name remains `create-api-node`; binaries `create-api-node` and `cna` unchanged.

## [0.1.0] - 2025-03-04

### Added

- Initial release of CAN (Create API Node) CLI.
- Interactive prompts for project name and template selection.
- Pipeline: init, generate, install, lint config, test config, finalize.
- Three templates: **base** (Express + TypeScript), **nest** (NestJS), **vkrun** (VkrunJS).
- User-friendly error messages (permission denied, install failed, not found).
- Colored output and ASCII banner; red reserved for errors.
- Binaries: `create-api-node` and `cna` (e.g. `npx create-api-node`, `npx cna`).

### Requirements

- Node.js >= 18.
- npm, yarn, or pnpm for the generated project (CLI uses npm by default).

> **Note:** 0.x.y indicates initial development; API and behavior may change before 1.0.0.

[0.1.4]: https://www.npmjs.com/package/create-api-node/v/0.1.4
[0.1.3]: https://www.npmjs.com/package/create-api-node/v/0.1.3
[0.1.2]: https://www.npmjs.com/package/create-api-node/v/0.1.2
[0.1.1]: https://www.npmjs.com/package/create-api-node/v/0.1.1
[0.1.0]: https://www.npmjs.com/package/create-api-node/v/0.1.0
