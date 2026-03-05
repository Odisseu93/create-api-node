# CNA — Create Node API

**CNA** is a scaffolding CLI (similar to Create React App or Vite) that generates a Node + Express + TypeScript API with standard tooling. Run with:

```bash
npx create-node-api <target-directory>
# or
npx cna <target-directory>
```

The CLI will install dependencies, configure TypeScript, ESLint/Prettier, Jest, and generate a ready-to-use API structure.

## Development

- **Build:** `npm run build`
- **Test:** `npm test` / `npm run test:watch` / `npm run test:coverage`
- **Lint:** `npm run lint` / `npm run lint:fix`
- **Format:** `npm run format`

## Project structure

- `bin/` — CLI entrypoint
- `core/` — Runner and shared context
- `steps/` — Pipeline steps (init, generate, install, finalize, etc.)
- `templates/` — Base template for the generated project
- `utils/` — exec, fs, logger helpers

## License

MIT
