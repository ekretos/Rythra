---
title: CircuitBreakerOptions
description: API Reference for CircuitBreakerOptions
---

[**Rythra Documentation v0.3.0**](../README.md)

***

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:4](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L4)

Configuration for a node circuit breaker.

## Properties

### failureThreshold?

> `optional` **failureThreshold?**: `number`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:5](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L5)

Consecutive failures required to open.

***

### resetTimeout?

> `optional` **resetTimeout?**: `number`

Defined in: [packages/core/src/reliability/CircuitBreaker.ts:6](https://github.com/ekretos/Rythra/blob/main/packages/core/src/reliability/CircuitBreaker.ts#L6)

Reset timeout in milliseconds.
