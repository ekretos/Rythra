# Rythra Ecosystem

Rythra is designed as a framework-agnostic Lavalink runtime with an ecosystem of small, independently installable packages.

## Extension layers

- **Connectors** adapt Discord libraries to Rythra without coupling the core runtime to a framework.
- **Providers** add search and resolution capabilities.
- **Plugins** extend runtime behavior through lifecycle-safe contracts.
- **Persistence adapters** provide optional durable state.
- **Metrics adapters** export telemetry to an application's observability stack.

## Community package rules

Third-party integrations should:

1. Depend on the smallest Rythra package they require.
2. Avoid importing private/internal implementation paths.
3. Expose TypeScript types and JSDoc for public APIs.
4. Declare supported Rythra and Lavalink versions.
5. Include automated tests for their adapter/plugin behavior.
6. Document configuration, permissions, and failure behavior.

## Naming

Official packages use the `@rythra/*` scope. Community packages should use a distinct publisher scope and clearly identify their Rythra integration in the package description.

## Compatibility

Integrations should publish a compatibility matrix covering the Rythra package version, Lavalink protocol version, and host Discord framework/runtime where applicable.
