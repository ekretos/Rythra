---
title: NodeStateMachine
description: API Reference for NodeStateMachine
---

[**Rythra Documentation v0.2.0**](../README.md)

***

Defined in: [packages/core/src/node/NodeState.ts:25](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/node/NodeState.ts#L25)

Small state machine describing the lifecycle of a Lavalink node.

## Remarks

Node lifecycle used to be tracked with ad-hoc boolean flags. Routing every
change through a single machine keeps reconnects, draining and health
reporting consistent, and makes illegal transitions observable instead of
silently corrupting state.

## Constructors

### Constructor

> **new NodeStateMachine**(`onTransition?`): `NodeStateMachine`

Defined in: [packages/core/src/node/NodeState.ts:30](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/node/NodeState.ts#L30)

Creates a state machine, optionally observing every accepted transition.

#### Parameters

##### onTransition?

[`NodeStateListener`](../type-aliases/NodeStateListener.md)

#### Returns

`NodeStateMachine`

## Accessors

### state

#### Get Signature

> **get** **state**(): [`NodeState`](../type-aliases/NodeState.md)

Defined in: [packages/core/src/node/NodeState.ts:33](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/node/NodeState.ts#L33)

The current node state.

##### Returns

[`NodeState`](../type-aliases/NodeState.md)

## Methods

### can()

> **can**(`to`): `boolean`

Defined in: [packages/core/src/node/NodeState.ts:36](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/node/NodeState.ts#L36)

Determines whether a transition to the given state is accepted.

#### Parameters

##### to

[`NodeState`](../type-aliases/NodeState.md)

#### Returns

`boolean`

***

### transition()

> **transition**(`to`): `boolean`

Defined in: [packages/core/src/node/NodeState.ts:44](https://github.com/ekretos/Rythra/blob/af6fc848e5960dfe585224bf31c43fac8682cc38/packages/core/src/node/NodeState.ts#L44)

Moves the machine to a new state.

#### Parameters

##### to

[`NodeState`](../type-aliases/NodeState.md)

The requested state.

#### Returns

`boolean`

`true` when the state changed, `false` for a repeated or illegal transition.
