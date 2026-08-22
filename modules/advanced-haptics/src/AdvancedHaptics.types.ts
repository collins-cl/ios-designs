export type HapticPreset =
  | "soft"
  | "medium"
  | "strong"
  | "success"
  | "error"
  | "connector"
  | "pulse";

export interface HapticCurvePoint {
  /**
   * Absolute time in seconds (not a fraction of duration).
   */
  time: number;
  /**
   * Intensity at that time, in the range 0.0 → 1.0.
   */
  value: number;
}

export interface HapticOptions {
  /**
   * Preset base. Custom fields below override the preset's values.
   */
  preset?: HapticPreset;
  /**
   * Duration in milliseconds.
   */
  duration?: number;
  /**
   * Overall strength, 0.0 → 1.0.
   */
  intensity?: number;
  /**
   * 0.0 (soft/smooth) → 1.0 (crisp/sharp).
   */
  sharpness?: number;
  /**
   * How quickly the effect ramps from zero to peak.
   * A value ≤ 1 is a fraction of the duration; a value > 1 is milliseconds.
   */
  attack?: number;
  /**
   * How quickly the effect fades out.
   * A value ≤ 1 is a fraction of the duration; a value > 1 is milliseconds.
   */
  decay?: number;
  /**
   * Optional explicit intensity envelope. Overrides attack/decay.
   */
  curve?: HapticCurvePoint[];
}

/**
 * The payload that is actually sent to the native side.
 */
export interface HapticNativeRequest {
  duration: number;
  intensity: number;
  sharpness: number;
  attack: number;
  decay: number;
  curve?: HapticCurvePoint[];
}

export interface AdvancedHapticsNativeModule {
  playHaptic(request: HapticNativeRequest): Promise<string>;
  stopHaptic(): Promise<void>;
  isSupported(): boolean;
}
