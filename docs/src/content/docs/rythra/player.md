---
title: Player Control
description: Learn how to control audio playback with RythraPlayer.
---

The `RythraPlayer` class is responsible for managing audio playback in a specific guild.

## Managing Playback

### Playing Tracks

You can play a track by passing its encoded string or a `Track` object to the `play` method:

```typescript
// Play a track directly
await player.play(track);

// Add to queue and play if nothing is playing
player.queue.add(track);
if (!player.playing) await player.play();
```

### Pausing and Resuming

```typescript
// Pause playback
await player.pause(true);

// Resume playback
await player.pause(false);
```

### Stopping Playback

```typescript
await player.stop();
```

### Skipping Tracks

```typescript
await player.skip();
```

## Volume Control

You can set the volume level between 0 and 1000 (default is 100):

```typescript
await player.setVolume(200);
```

## Queue Management

The `player.queue` object allows you to manage the list of upcoming tracks.

```typescript
// Add a track to the queue
player.queue.add(track);

// Clear the queue
player.queue.clear();

// Get the number of tracks in the queue
console.log(`Queue length: ${player.queue.length}`);
```

Next, learn more about [Event Handling](/rythra/events).
