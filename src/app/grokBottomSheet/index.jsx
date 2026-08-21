// import { LinearGradient } from "expo-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  createAnimatedComponent,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import GrokBottomSheetRenderStep from "../../components/GrokBottomSheetRenderStep";
import GlassButton from "../../components/ui/GlassButton";
import { useTheme } from "../../theme/ThemeProvider";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const AnimatedLinearGradient = createAnimatedComponent(LinearGradient);

const gradientColors = {
  red: [
    "rgba(120, 0, 0, 0.10)",
    "rgba(100, 0, 0, 0.08)",
    "rgba(80, 0, 0, 0.02)",
    "rgba(0, 0, 0, 0)",
  ],

  blue: [
    "rgba(0, 61, 140, 0.27)",
    "rgba(0, 50, 120, 0.15)",
    "rgba(0, 40, 100, 0.05)",
    "rgba(0, 0, 0, 0)",
  ],

  green: [
    "rgba(0, 120, 60, 0.27)",
    "rgba(0, 100, 50, 0.15)",
    "rgba(0, 80, 40, 0.05)",
    "rgba(0, 0, 0, 0)",
  ],
};

const index = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState("intro");
  const linearTranslateY = useSharedValue(-1000);
  const [connecting, setConnecting] = useState(false);

  const linearTranslateYAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: linearTranslateY.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (step === "intro") {
      linearTranslateY.value = withDelay(
        500,
        withTiming(0, {
          duration: 1000,
        }),
      );
    }
  }, [step]);

  const handleConnect = useCallback(() => {
    setConnecting(true);
    setTimeout(() => {
      setStep("connected");
    }, 1000);
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.surface,
          },
        }}
      />

      <View style={{ flex: 1 }}>
        <GrokBottomSheetRenderStep
          step={step}
          colors={colors}
          connecting={connecting}
          onConnect={handleConnect}
          color={gradientColors.red[0]}
        />

        {step === "intro" ? (
          <AnimatedLinearGradient
            colors={gradientColors.red}
            locations={[0, 0.35, 0.75, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[linearTranslateYAnim, styles.linearGradient]}
          />
        ) : null}

        <View
          style={{
            position: "absolute",
            top: 16,
            left: 8,
            zIndex: 10,
          }}
        >
          <GlassButton
            size="large"
            type="xmark"
            onPress={() => router.dismiss()}
          />
        </View>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT * 0.35,
    zIndex: -1,
  },
});
