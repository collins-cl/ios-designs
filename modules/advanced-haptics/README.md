# advanced-haptics

A local Expo native module for **iOS** that wraps Apple's [Core Haptics](https://developer.apple.com/documentation/corehaptics) framework and exposes it through the **Expo Modules API** (SDK 57).

It provides customizable, envelope-based haptic effects — smooth ramp-up, sustain, and fade-out — instead of the simple "vibrate for N milliseconds" behavior of the `Vibration` API. The design goal is a premium, physical UI response (subtle connector/action feedback) rather than a continuous buzz.

> **Not** based on `expo-haptics` or React Native's `Vibration`. This module builds `CHHapticPattern`s directly with `CHHapticEvent`, `CHHapticParameterCurve`, and `CHHapticAdvancedPatternPlayer`.

---

## Features

- Configurable **duration**, **intensity**, **sharpness**, **attack**, and **decay**.
- Optional **custom intensity curve** (explicit envelope).
- **Presets**: `soft`, `medium`, `strong`, `success`, `error`, `connector`, `pulse`.
- Promise-based API with a returned **player id**.
- Manual cancellation via `stopHaptic()`.
- Capability check via `isSupported()`.
- Lazy, reusable `CHHapticEngine` with reset/interruption recovery.
- Single active player — rapid calls **replace** the previous effect (no stacking).
- Input validation/clamping on both the JS and Swift sides.
- All Core Haptics work runs on a background serial queue (never blocks the JS thread).

---

## Requirements

| Requirement | Detail |
|---|---|
| Expo SDK | 57 |
| Platform | iOS only (the module has no Android implementation) |
| Deployment target | iOS 16.4 (matches this project; Core Haptics itself requires iOS 13+) |
| Build type | **Development build** (custom native module — not available in Expo Go) |
| Hardware | Physical iPhone for actual feedback (the Simulator emits no haptic) |
| Info.plist | **No keys required** |
| Entitlements | **None required** |

`isSupported()` returns `false` on devices without Core Haptics (older iPhones, most iPads, Simulator). All calls are safe no-ops when unsupported.

---

## Folder structure

```
modules/
  advanced-haptics/
    expo-module.config.json
    package.json
    ios/
      AdvancedHaptics.podspec
      AdvancedHapticsModule.swift
    src/
      index.ts
      AdvancedHaptics.types.ts
```

Expo SDK 51+ auto-links modules found under the project's `modules/` directory (`nativeModulesDir` defaults to `./modules`), so no manual Podfile edits are needed for the native side.

---

## Installation

The native side is discovered automatically from `modules/`. Rebuild the development client so the Swift code is compiled into the binary:

```bash
# Re-generate native projects (runs pod install)
npx expo prebuild -p ios

# Build and run on a physical device
npx expo run:ios
```

Or via EAS:

```bash
eas build --profile development --platform ios
```

> **Expo Go cannot run this module** — the native code is not part of Expo Go's binary. Use a development build.

### Importing

**Relative import (works out of the box):**

```ts
import { playHaptic } from "../../modules/advanced-haptics";
```

**Path alias `@/`** — add a `tsconfig.json` with the standard Expo Router mapping (this project currently has no `tsconfig.json`):

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Then:

```ts
import { playHaptic, stopHaptic, isSupported } from "@/modules/advanced-haptics";
```

---

## API

### `playHaptic(options?: HapticOptions): Promise<string>`

Builds and plays a haptic pattern. Resolves with a player id (`UUID`). Rejects with an `Error` if the engine fails to initialize/start.

```ts
await playHaptic({ preset: "connector", duration: 3000 });
```

### `stopHaptic(): Promise<void>`

Stops the currently playing haptic (if any).

```ts
await stopHaptic();
```

### `isSupported(): boolean`

Whether the device supports Core Haptics.

```ts
if (isSupported()) {
  playHaptic({ preset: "success" });
}
```

---

## Options

```ts
interface HapticOptions {
  preset?: HapticPreset;       // base preset; custom fields override it
  duration?: number;           // milliseconds (clamped 20…15000)
  intensity?: number;          // 0.0 → 1.0 overall strength
  sharpness?: number;          // 0.0 soft → 1.0 crisp
  attack?: number;             // ≤ 1 = fraction of duration; > 1 = milliseconds
  decay?: number;              // ≤ 1 = fraction of duration; > 1 = milliseconds
  curve?: HapticCurvePoint[];  // explicit envelope; overrides attack/decay
}

interface HapticCurvePoint {
  time: number;   // absolute seconds (not a fraction)
  value: number;  // 0.0 → 1.0
}
```

---

## Presets

| Preset | duration | intensity | sharpness | attack | decay | Feel |
|---|---|---|---|---|---|---|
| `soft` | 250 ms | 0.20 | 0.10 | 0.40 | 0.50 | Subtle; safe for frequent UI interactions |
| `medium` | 400 ms | 0.45 | 0.30 | 0.20 | 0.40 | Moderate body |
| `strong` | 500 ms | 0.75 | 0.60 | 0.10 | 0.30 | Forceful and punchy |
| `success` | 600 ms | 0.40 | 0.25 | 0.15 | 0.60 | Short and pleasant |
| `error` | 500 ms | 0.65 | 0.80 | 0.05 | 0.25 | Strong, sharp, attention-grabbing |
| `connector` | 3000 ms | 0.32 | 0.12 | 0.35 | 0.50 | Soft ramp → subtle sustain → gradual fade |
| `pulse` | 300 ms | 0.50 | 0.40 | 0.10 | 0.45 | Short heartbeat pulse |

`playHaptic()` with no arguments uses the `soft` preset. Any explicitly provided option overrides the preset value.

---

## Usage examples

```tsx
import { playHaptic, stopHaptic, isSupported } from "@/modules/advanced-haptics";

// 1. Basic (soft preset)
playHaptic();

// 2. Custom duration
playHaptic({ duration: 3000 });

// 3. Custom intensity
playHaptic({ duration: 3000, intensity: 0.25 });

// 4. Connector preset
playHaptic({ preset: "connector", duration: 3000 });

// 5. Custom curve (absolute seconds)
await playHaptic({
  duration: 3000,
  intensity: 0.4,
  curve: [
    { time: 0,   value: 0 },
    { time: 0.3, value: 0.5 },
    { time: 0.8, value: 1 },
    { time: 2,   value: 0.6 },
    { time: 3,   value: 0 },
  ],
});

// 6. Stop
await stopHaptic();

// 7. Capability check
if (isSupported()) {
  playHaptic({ preset: "success" });
}
```

---

## How the effect is built (envelope model)

The native side creates a single **continuous** `CHHapticEvent` plus a **`CHHapticParameterCurve`** on `.hapticIntensityControl`.

- **duration** → event duration (seconds), clamped to `20…15000 ms`.
- **intensity** → the peak value of the intensity control curve.
- **sharpness** → a constant `.hapticSharpness` event parameter.
- **attack / decay** → four control points:

```
attack > 0:  (0, 0)              → (attack, intensity)         # ramp up
attack = 0:  (0, intensity)                                     # start at peak
decay  > 0:  (duration-decay, intensity) → (duration, 0)       # fade out
decay  = 0:  (duration, intensity)                              # hold to the end
```

If `attack + decay > duration`, both are scaled proportionally to fit.

- **custom curve** → replaces attack/decay. Points are sorted, times clamped to `[0, duration]`, values clamped to `[0, 1]`. The first point is pinned to `t = 0` and the last to `t = duration`.

The event's own `.hapticIntensity` is `1.0`, so the curve's absolute control values are the effective intensity (peak = `intensity`). This is what produces the `╭──────╮` "ramp → sustain → fade" shape rather than a flat `████████` buzz.

---

## Engine & concurrency behavior

- `CHHapticEngine` is created **lazily** and reused.
- The engine is restarted automatically on `stoppedHandler` and `resetHandler` events.
- Audio-session interruptions are observed; the engine recovers on `.ended`.
- All operations run on a dedicated serial background queue (`com.advancedhaptics.engine`, `.userInitiated`).
- Only **one** `CHHapticAdvancedPatternPlayer` is active at a time. A new `playHaptic` stops the previous player first.
- `playHaptic` resolves once the player has started; the player id is returned for traceability (cancellation is global via `stopHaptic`).

---

## Error handling

The module fails gracefully — it never crashes the app because a haptic can't play:

- Core Haptics unsupported → `isSupported()` is `false`; `playHaptic` still resolves (the pattern simply won't be felt) or rejects with the underlying error where applicable.
- Engine init/start failure → the `playHaptic` promise rejects with the underlying `Error`.
- Engine reset/stop → state is reset and the engine is restarted on the next call.
- Invalid JS values → clamped/sanitized on the JS side, then clamped again defensively in Swift.
- Interruption → player is cleared; engine restarts after the interruption ends.

---

## Platform limitations

- **iPhone** — full Core Haptics support (iPhone 8 and later).
- **iPad** — Core Haptics APIs exist, but most iPads lack the Taptic Engine, so `supportsHaptics` correctly reports `false` (calls are safe no-ops).
- **Simulator** — APIs exist but produce no physical feedback.
- **Expo Go** — does not contain this custom native module; use a development build.

---

## Common issues

| Symptom | Fix |
|---|---|
| `Cannot find native module 'AdvancedHaptics'` | Rebuild the dev client: `npx expo prebuild -p ios && npx expo run:ios` |
| `Unable to resolve module 'expo-modules-core'` | Ensure `package.json` lists `"expo-modules-core": "~57.0.7"` |
| `@/modules/...` not resolving | Add the `tsconfig.json` path mapping, or use a relative import |
| No feedback on Simulator | Expected — test on a physical iPhone |
| Feels like a constant buzz | Increase `attack`/`decay` or pass a custom `curve` |
| Haptics overlap | By design: each `playHaptic` stops the previous player |

---

## Configuration files (for reference)

- `expo-module.config.json` — registers `AdvancedHapticsModule` on the `apple` platform.
- `ios/AdvancedHaptics.podspec` — CocoaPods spec (iOS 16.4, depends on `ExpoModulesCore`).
- `package.json` — module metadata; `main` points to `src/index.ts`.
- `ios/AdvancedHapticsModule.swift` — the Swift implementation.
- `src/index.ts` — JS/TS API, validation, clamping, presets.
- `src/AdvancedHaptics.types.ts` — shared TypeScript types.
