# @rythra/connectors

Discord gateway/voice adapters. Connectors translate Discord-library events into Rythra's framework-agnostic voice contract.

Planned built-ins:

- Discord.js
- Eris
- OceanicJS
- Seyfert

DAVE-specific cryptographic implementation belongs to the underlying voice stack; Rythra consumes a normalized voice capability rather than duplicating cryptography.
