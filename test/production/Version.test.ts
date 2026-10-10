import { expect, test } from 'bun:test';
import core from '../../packages/core/package.json';
import { Rythra } from '../../packages/core/src/Rythra';

test('default client version matches the @rythra/core package version', () => {
    const connector = { client: {}, setManager() {}, listen() {}, sendPacket() {}, getId: () => '1' };
    expect(new Rythra({ connector: connector as never }).version).toBe(core.version);
});
