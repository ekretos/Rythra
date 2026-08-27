# Rythra integration template

Use this checklist when creating a connector, provider, plugin, persistence adapter, or metrics adapter.

## Package

- [ ] Package name and publisher are clear.
- [ ] Minimal `@rythra/*` dependency is used.
- [ ] Public exports are documented with JSDoc.
- [ ] Runtime requirements are documented.

## Compatibility

| Component | Supported versions |
| --- | --- |
| Rythra | `x.y` |
| Lavalink | `v4 / v5` |
| Runtime | `Node / Bun` |
| Framework | `name + version` |

## Quality

- [ ] Unit tests cover the public behavior.
- [ ] Failure and reconnect behavior is tested where applicable.
- [ ] README contains installation and configuration examples.
- [ ] No private Rythra imports are used.
- [ ] License and security contact are present.

## Release

Publish a changelog entry and use SemVer. Breaking changes require a major version unless the package is still pre-1.0 and its documented compatibility policy says otherwise.
