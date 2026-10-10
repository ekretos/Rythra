# @rythra/persistence

Optional durable state adapters for player recovery and queue persistence.

The package must not force Redis, SQL, or any other database on consumers. Adapters implement the core persistence contract.

```ts
import { MemoryPersistenceAdapter, FilePersistenceAdapter } from '@rythra/persistence';
const adapter = new FilePersistenceAdapter('./data/players.json');
```
