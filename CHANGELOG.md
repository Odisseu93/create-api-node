# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-03-04

### Added

- Initial release of CNA (Create Node API) CLI.
- Interactive prompts for project name and template selection.
- Pipeline: init, generate, install, lint config, test config, finalize.
- Three templates: **base** (Express + TypeScript), **nest** (NestJS), **vkrun** (VkrunJS).
- User-friendly error messages (permission denied, install failed, not found).
- Colored output and ASCII banner; red reserved for errors.
- Binaries: `create-node-api` and `cna` (e.g. `npx create-node-api`, `npx cna`).

### Requirements

- Node.js >= 18.
- npm, yarn, or pnpm for the generated project (CLI uses npm by default).

> **Note:** 0.x.y indicates initial development; API and behavior may change before 1.0.0.

[0.1.0]: https://github.com/your-org/create-node-api/releases/tag/v0.1.0
