import { requireNativeModule } from "expo-modules-core";

import type {
  AdvancedHapticsNativeModule,
  HapticNativeRequest,
  HapticOptions,
  HapticPreset,
} from "./AdvancedHaptics.types";

export type {
  AdvancedHapticsNativeModule,
  HapticCurvePoint,
  HapticNativeRequest,
  HapticOptions,
  HapticPreset,
} from "./AdvancedHaptics.types";

const nativeModule =
  requireNativeModule<AdvancedHapticsNativeModule>("AdvancedHaptics");

// ---------------------------------------------------------------------------
// Clamping
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ---------------------------------------------------------------------------
// Presets
// ---------------------------------------------------------------------------

const PRESETS: Record<
  HapticPreset,
  Required<Omit<HapticOptions, "curve" | "preset">>
> = {
  soft: {
    duration: 250,
    intensity: 0.2,
    sharpness: 0.1,
    attack: 0.4,
    decay: 0.5,
  },
  medium: {
    duration: 400,
    intensity: 0.45,
    sharpness: 0.3,
    attack: 0.2,
    decay: 0.4,
  },
  strong: {
    duration: 500,
    intensity: 0.75,
    sharpness: 0.6,
    attack: 0.1,
    decay: 0.3,
  },
  success: {
    duration: 600,
    intensity: 0.4,
    sharpness: 0.25,
    attack: 0.15,
    decay: 0.6,
  },
  error: {
    duration: 500,
    intensity: 0.65,
    sharpness: 0.8,
    attack: 0.05,
    decay: 0.25,
  },
  connector: {
    duration: 3000,
    intensity: 0.32,
    sharpness: 0.12,
    attack: 0.35,
    decay: 0.5,
  },
  pulse: {
    duration: 300,
    intensity: 0.5,
    sharpness: 0.4,
    attack: 0.1,
    decay: 0.45,
  },
};

const DEFAULTS: Required<Omit<HapticOptions, "curve" | "preset">> = {
  duration: 300,
  intensity: 0.3,
  sharpness: 0.2,
  attack: 0.2,
  decay: 0.4,
};

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------

/**
 * attack/decay ≤ 1 are treated as a fraction of the duration;
 * values > 1 are treated as milliseconds. Always returns milliseconds.
 */
function normalizeTiming(value: number, durationMs: number): number {
  if (value <= 1) {
    return clamp(value, 0, 1) * durationMs;
  }
  return clamp(value, 0, durationMs);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function playHaptic(options?: HapticOptions): Promise<string> {
  const preset = PRESETS[options?.preset ?? "soft"];

  const duration = clamp(
    options?.duration ?? preset.duration ?? DEFAULTS.duration,
    20,
    15000,
  );
  const intensity = clamp(
    options?.intensity ?? preset.intensity ?? DEFAULTS.intensity,
    0,
    1,
  );
  const sharpness = clamp(
    options?.sharpness ?? preset.sharpness ?? DEFAULTS.sharpness,
    0,
    1,
  );

  const attackRaw = options?.attack ?? preset.attack ?? DEFAULTS.attack;
  const decayRaw = options?.decay ?? preset.decay ?? DEFAULTS.decay;

  const request: HapticNativeRequest = {
    duration,
    intensity,
    sharpness,
    attack: normalizeTiming(attackRaw, duration),
    decay: normalizeTiming(decayRaw, duration),
  };

  if (options?.curve && options.curve.length >= 2) {
    request.curve = options.curve
      .map((point) => ({
        time: Math.max(0, point.time),
        value: clamp(point.value, 0, 1),
      }))
      .sort((a, b) => a.time - b.time);
  }

  return nativeModule.playHaptic(request);
}

export function stopHaptic(): Promise<void> {
  return nativeModule.stopHaptic();
}

export function isSupported(): boolean {
  try {
    return nativeModule.isSupported();
  } catch {
    return false;
  }
}
