# @rythra/protocol

Versioned Lavalink protocol boundary.

```text
protocol/
├── v4/            # Lavalink v4 wire/REST contracts
├── v5/            # Lavalink v5 compatibility boundary
├── version.ts     # version negotiation
└── types.ts       # normalized protocol types
```

Rythra's public player API must remain independent of Lavalink protocol generation. Version-specific behavior belongs here.
