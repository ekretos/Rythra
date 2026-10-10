# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Lunibee connector.
- `CONTRIBUTING.md`, `LICENSE` and this changelog.

### Changed
- Merged `@rythra/connector-discordjs`, `-eris`, `-oceanic` and `-seyfert` into a single `@rythra/connectors` package (subpath exports: `/discordjs`, `/eris`, `/oceanic`, `/seyfert`, `/lunibee`).
- Upgraded TypeScript to 6.0.3 and all dependencies (including docs: Astro 7, Starlight 0.42) to latest.

## [0.2.0]

- Initial modular release: `@rythra/core`, `protocol`, `plugins` and per-library connectors.
