---
title: CircuitBreaker
description: API Reference for CircuitBreaker
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:9](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L9)

Small dependency-free circuit breaker for unreliable Lavalink nodes.

## Constructors

### Constructor

> **new CircuitBreaker**(`options?`): `CircuitBreaker`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:16](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L16)

Creates a circuit breaker.

#### Parameters

##### options?

[`CircuitBreakerOptions`](../interfaces/CircuitBreakerOptions.md) = `{}`

#### Returns

`CircuitBreaker`

## Properties

### failures

> **failures**: `number` = `0`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:11](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L11)

Consecutive failures.

***

### openedAt

> **openedAt**: `number` = `0`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:12](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L12)

Time at which circuit opened.

***

### state

> **state**: [`CircuitState`](../type-aliases/CircuitState.md) = `'closed'`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:10](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L10)

Current circuit state.

## Methods

### canRequest()

> **canRequest**(): `boolean`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:21](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L21)

Determines whether a request may currently be attempted.

#### Returns

`boolean`

***

### failure()

> **failure**(): `void`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:36](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L36)

Records failure and opens the circuit at the configured threshold.

#### Returns

`void`

***

### success()

> **success**(): `void`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:30](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L30)

Records success and closes the circuit.

#### Returns

`void`
