import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function Spinner({ size = 24, color = "#8f8f8f" }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  const barWidth = size * 0.34;
  const barHeight = size * 0.1;

  return (
    <View style={{ width: size, height: size }}>
      {Array.from({ length: 8 }, (_, i) => {
        // Stagger each bar by 1/8 of the loop.
        const shifted = Animated.modulo(Animated.add(progress, i / 8), 1);
        const opacity = shifted.interpolate({
          inputRange: [0, 1],
          outputRange: [0.15, 1],
        });

        return (
          <Animated.View
            key={i}
            style={{
              position: "absolute",
              width: barWidth,
              height: barHeight,
              borderRadius: barHeight / 2,
              backgroundColor: color,
              left: size / 2 - barWidth / 2,
              top: size / 2 - barHeight / 2,
              opacity,
              transform: [
                { rotate: `${i * 45}deg` },
                { translateX: size * 0.35 },
              ],
            }}
          />
        );
      })}
    </View>
  );
}
