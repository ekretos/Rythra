# Contributing to Rythra

Thanks for helping improve Rythra!

## Setup

Requires [Bun](https://bun.sh).

```bash
git clone https://github.com/Ekretos/Rythra.git
cd Rythra
bun install
```

## Layout

Bun workspace monorepo: `packages/core`, `protocol`, `plugins`, `connectors` (discord.js, Eris, Oceanic.js, Seyfert, Lunibee), plus the `rythra` facade at the root and the Astro site in `docs/`.

## Workflow

1. Fork and create a branch from `dev`.
2. Make a focused change; follow the surrounding code style.
3. Add or update tests (`test/` and `packages/*/test`).
4. Run the checks below.
5. Add an entry under **Unreleased** in `CHANGELOG.md`.
6. Open a pull request against `dev` describing what and why.

## Checks

```bash
bun run typecheck       # tsc --noEmit
bun test                # unit tests
bun run lint            # eslint
bun run format          # prettier
bun run check:packages  # workspace boundaries + version consistency
bun run build           # build all packages and docs
```

## Adding a connector

Extend `Connector` from `@rythra/core` in `packages/connectors/src/<name>.ts`, implement `listen`, `sendPacket` and `getId`, export it from `src/index.ts`, and add a subpath export in `packages/connectors/package.json` and the root `package.json`. Use `import type` for the library's types so it stays an optional peer.

## Commits

Use short, imperative messages (e.g. `Add Lunibee connector`).

## Reporting issues

Open a GitHub issue with reproduction steps, versions (Rythra, Lavalink, Discord library, runtime) and logs.

By contributing you agree your work is licensed under the [MIT License](./LICENSE).
