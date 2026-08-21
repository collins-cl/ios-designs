import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Stop,
  RadialGradient as SvgRadialGradient,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");
const diagonal = Math.hypot(width, height);

const RadialGradient = ({ color = "#ff6b6b", load = true }) => {
  const circleScale = useSharedValue(1);
  const r = useSharedValue(10);
  const targetScale = diagonal / (r.value * 2);

  useEffect(() => {
    if (load) {
      circleScale.value = withDelay(
        500,
        withSpring(targetScale, {
          duration: 1000,
          damping: 200,
        }),
      );
    }
  }, [load]);

  const rStyle = useAnimatedStyle(() => {
    return {
      width: r.value * 3,
      height: r.value * 3,
      borderRadius: r.value,
      opacity: interpolate(
        circleScale.value,
        [0.4, targetScale],
        [0.4, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: circleScale.value,
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={[rStyle, styles.circle]}>
        <Svg
          width={r.value * 2}
          height={r.value * 2}
          viewBox={`0 0 ${r.value * 2} ${r.value * 2}`}
        >
          <Defs>
            <SvgRadialGradient id="glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={color} stopOpacity={0} />
              <Stop offset="35%" stopColor={color} stopOpacity={0} />
              <Stop offset="60%" stopColor={color} stopOpacity={0.85} />
              <Stop offset="100%" stopColor={color} stopOpacity={0} />
            </SvgRadialGradient>
          </Defs>
          <Circle cx={r.value} cy={r.value} r={r.value} fill="url(#glow)" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default RadialGradient;

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
  },
});
