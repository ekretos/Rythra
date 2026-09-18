---
title: CircuitBreaker
description: API Reference for CircuitBreaker
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:6](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L6)

Small dependency-free circuit breaker for unreliable Lavalink nodes.

## Constructors

### Constructor

> **new CircuitBreaker**(`options?`): `CircuitBreaker`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:12](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L12)

Creates a circuit breaker.

#### Parameters

##### options?

[`CircuitBreakerOptions`](../interfaces/CircuitBreakerOptions.md) = `{}`

#### Returns

`CircuitBreaker`

## Properties

### failures

> **failures**: `number` = `0`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:8](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L8)

Consecutive failures.

***

### openedAt

> **openedAt**: `number` = `0`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:9](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L9)

Time at which circuit opened.

***

### state

> **state**: [`CircuitState`](../type-aliases/CircuitState.md) = `'closed'`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:7](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L7)

Current circuit state.

## Methods

### canRequest()

> **canRequest**(): `boolean`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:14](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L14)

Determines whether a request may currently be attempted.

#### Returns

`boolean`

***

### failure()

> **failure**(): `void`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:18](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L18)

Records failure and opens the circuit at the configured threshold.

#### Returns

`void`

***

### success()

> **success**(): `void`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:16](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/reliability/CircuitBreaker.ts#L16)

Records success and closes the circuit.

#### Returns

`void`
