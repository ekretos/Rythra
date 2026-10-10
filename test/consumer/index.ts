// Compiles against the *built* public packages only (no private source paths). Run `bun run build:packages` first.
import { Rythra } from 'rythra';
import type { RythraOptions, Track } from '@rythra/types';
import { Connector, Queue } from '@rythra/core';
import { DiscordJS, Eris, Lunibee, OceanicJS, Seyfert } from '@rythra/connectors';
import { Lunibee as LunibeeSub } from '@rythra/connectors/lunibee';
import { toPrometheus, PrometheusMetricsAdapter } from '@rythra/metrics';
import { FilePersistenceAdapter, MemoryPersistenceAdapter } from '@rythra/persistence';

declare const connector: Connector;
const options: RythraOptions = { connector, failover: true, nodes: [{ host: 'localhost', password: 'secret' }] };
const rythra = new Rythra(options);
const queue: Queue = new Queue();
const track = undefined as unknown as Track;
queue.add(track);
const classes = [DiscordJS, Eris, Lunibee, LunibeeSub, OceanicJS, Seyfert];
const metrics = [toPrometheus, PrometheusMetricsAdapter];
const stores = [FilePersistenceAdapter, MemoryPersistenceAdapter];
export { rythra, classes, metrics, stores };
