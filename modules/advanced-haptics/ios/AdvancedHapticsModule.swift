import ExpoModulesCore
import CoreHaptics
import AVFoundation
import Foundation

// MARK: - Haptic request model

struct HapticRequest {
  struct CurvePoint {
    let time: TimeInterval
    let value: Float
  }

  let id: String
  let duration: TimeInterval
  let intensity: Float
  let sharpness: Float
  let attack: TimeInterval
  let decay: TimeInterval
  let curve: [CurvePoint]?
}

// MARK: - Error

enum HapticsError: LocalizedError {
  case moduleDeallocated

  var errorDescription: String? {
    switch self {
    case .moduleDeallocated:
      return "The haptics module was deallocated."
    }
  }
}

// MARK: - Engine manager

final class HapticsEngineManager: @unchecked Sendable {
  static let shared = HapticsEngineManager()

  private let queue = DispatchQueue(label: "com.advancedhaptics.engine", qos: .userInitiated)
  private var engine: CHHapticEngine?
  private var engineIsRunning = false
  private var activePlayer: CHHapticAdvancedPatternPlayer?
  private var interruptionObserver: NSObjectProtocol?

  private init() {
    interruptionObserver = NotificationCenter.default.addObserver(
      forName: AVAudioSession.interruptionNotification,
      object: nil,
      queue: nil
    ) { [weak self] notification in
      self?.handleAudioSessionInterruption(notification)
    }
  }

  deinit {
    if let interruptionObserver {
      NotificationCenter.default.removeObserver(interruptionObserver)
    }
  }

  // MARK: Public API

  func play(
    options: [String: Any],
    completion: @escaping (Result<String, Error>) -> Void
  ) {
    queue.async { [weak self] in
      guard let self else {
        completion(.failure(HapticsError.moduleDeallocated))
        return
      }

      do {
        let request = try Self.parse(options)
        let engine = try self.prepareEngine()
        try self.stopActivePlayer()

        let pattern = try Self.makePattern(request)
        let player = try engine.makeAdvancedPlayer(with: pattern)
        self.activePlayer = player

        player.completionHandler = { [weak self] _ in
          self?.queue.async {
            self?.activePlayer = nil
          }
        }

        try player.start(atTime: CHHapticTimeImmediate)
        completion(.success(request.id))
      } catch {
        completion(.failure(error))
      }
    }
  }

  func stop(completion: @escaping () -> Void) {
    queue.async { [weak self] in
      try? self?.stopActivePlayer()
      completion()
    }
  }

  // MARK: Engine lifecycle

  private func prepareEngine() throws -> CHHapticEngine {
    if let engine, engineIsRunning {
      return engine
    }

    if let engine {
      try engine.start()
      engineIsRunning = true
      return engine
    }

    let engine = try CHHapticEngine()

    engine.stoppedHandler = { [weak self] _ in
      self?.queue.async {
        self?.engineIsRunning = false
        self?.activePlayer = nil
      }
    }

    engine.resetHandler = { [weak self] in
      self?.queue.async {
        self?.engineIsRunning = false
        self?.activePlayer = nil
      }
    }

    try engine.start()
    self.engine = engine
    engineIsRunning = true
    return engine
  }

  private func stopActivePlayer() throws {
    guard let activePlayer else {
      return
    }
    try activePlayer.stop(atTime: CHHapticTimeImmediate)
    self.activePlayer = nil
  }

  private func handleAudioSessionInterruption(_ notification: Notification) {
    guard
      notification.name == AVAudioSession.interruptionNotification,
      let rawValue = notification.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,
      let type = AVAudioSession.InterruptionType(rawValue: rawValue),
      type == .ended
    else {
      return
    }

    queue.async { [weak self] in
      guard let self else { return }
      self.engineIsRunning = false
      self.activePlayer = nil
      if let engine = self.engine {
        try? engine.start()
        self.engineIsRunning = true
      }
    }
  }

  // MARK: Parsing

  private static func parse(_ options: [String: Any]) throws -> HapticRequest {
    let durationMs = clamp(number(options["duration"]) ?? 300, 20, 15000)
    let duration = durationMs / 1000

    let intensity = Float(clamp(number(options["intensity"]) ?? 0.3, 0, 1))
    let sharpness = Float(clamp(number(options["sharpness"]) ?? 0.2, 0, 1))

    // attack/decay are delivered in milliseconds from JavaScript.
    let attack = clamp(number(options["attack"]) ?? 0, 0, durationMs) / 1000
    let decay = clamp(number(options["decay"]) ?? 0, 0, durationMs) / 1000

    var curve: [HapticRequest.CurvePoint]?
    if let rawCurve = options["curve"] as? [Any] {
      let points = rawCurve.compactMap { item -> HapticRequest.CurvePoint? in
        guard
          let point = item as? [String: Any],
          let time = number(point["time"]),
          let value = number(point["value"])
        else {
          return nil
        }
        return HapticRequest.CurvePoint(
          time: max(0, time),
          value: Float(clamp(value, 0, 1))
        )
      }
      if points.count >= 2 {
        curve = points
      }
    }

    return HapticRequest(
      id: UUID().uuidString,
      duration: duration,
      intensity: intensity,
      sharpness: sharpness,
      attack: attack,
      decay: decay,
      curve: curve
    )
  }

  private static func number(_ value: Any?) -> Double? {
    if let number = value as? NSNumber {
      return number.doubleValue
    }
    if let double = value as? Double {
      return double
    }
    return nil
  }

  private static func clamp(_ value: Double, _ min: Double, _ max: Double) -> Double {
    Swift.min(Swift.max(value, min), max)
  }

  // MARK: Pattern building

  private static func makePattern(_ request: HapticRequest) throws -> CHHapticPattern {
    let controlPoints = intensityControlPoints(request).map {
      CHHapticParameterCurve.ControlPoint(relativeTime: $0.0, value: $0.1)
    }

    let intensityParameter = CHHapticEventParameter(
      parameterID: .hapticIntensity,
      value: 1
    )
    let sharpnessParameter = CHHapticEventParameter(
      parameterID: .hapticSharpness,
      value: request.sharpness
    )

    let event = CHHapticEvent(
      eventType: .hapticContinuous,
      parameters: [intensityParameter, sharpnessParameter],
      relativeTime: 0,
      duration: request.duration
    )

    let curve = CHHapticParameterCurve(
      parameterID: .hapticIntensityControl,
      controlPoints: controlPoints,
      relativeTime: 0
    )

    return try CHHapticPattern(events: [event], parameterCurves: [curve])
  }

  private static func intensityControlPoints(
    _ request: HapticRequest
  ) -> [(TimeInterval, Float)] {
    if let custom = request.curve {
      let sorted = custom.sorted { $0.time < $1.time }
      let duration = request.duration

      var points: [(TimeInterval, Float)] = []

      if let first = sorted.first, first.time > 0 {
        points.append((0, first.value))
      }

      for point in sorted {
        points.append((min(point.time, duration), point.value))
      }

      if let last = points.last, last.0 < duration {
        points.append((duration, last.1))
      }

      return dedupe(points)
    }

    // Attack / sustain / decay envelope.
    let duration = request.duration
    var attack = min(request.attack, duration)
    var decay = min(request.decay, duration)

    if attack + decay > duration {
      let total = attack + decay
      attack = attack / total * duration
      decay = decay / total * duration
    }

    var points: [(TimeInterval, Float)] = []

    if attack > 0 {
      points.append((0, 0))
      points.append((attack, request.intensity))
    } else {
      points.append((0, request.intensity))
    }

    if decay > 0 {
      points.append((duration - decay, request.intensity))
      points.append((duration, 0))
    } else {
      points.append((duration, request.intensity))
    }

    return dedupe(points)
  }

  private static func dedupe(
    _ points: [(TimeInterval, Float)]
  ) -> [(TimeInterval, Float)] {
    var result: [(TimeInterval, Float)] = []
    for point in points {
      if let last = result.last, abs(last.0 - point.0) < 0.0005 {
        result[result.count - 1] = point
      } else {
        result.append(point)
      }
    }
    return result
  }
}

// MARK: - Expo module

public class AdvancedHapticsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AdvancedHaptics")

    AsyncFunction("playHaptic") { (options: [String: Any]?, promise: Promise) in
      HapticsEngineManager.shared.play(options: options ?? [:]) { result in
        switch result {
        case .success(let id):
          promise.resolve(id)
        case .failure(let error):
          promise.reject(error)
        }
      }
    }

    AsyncFunction("stopHaptic") { (promise: Promise) in
      HapticsEngineManager.shared.stop {
        promise.resolve()
      }
    }

    Function("isSupported") {
      CHHapticEngine.capabilitiesForHardware().supportsHaptics
    }
  }
}
