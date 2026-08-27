# Changesets

This directory contains release intent for the Rythra workspace.

Each package can be versioned independently. Release automation should publish only packages whose versions changed, while dependent packages receive coordinated updates when their public contracts require them.

## Example

```md
---
"@rythra/core": minor
"@rythra/types": patch
---

Add the new plugin lifecycle contract.
```
