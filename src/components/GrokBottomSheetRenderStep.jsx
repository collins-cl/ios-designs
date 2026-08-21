import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  createAnimatedComponent,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Logo from "../../assets/app-svgs/Gmail.svg";
import RadialGradient from "./RadialGradient";
import Spinner from "./ui/Spinner";
import ThemedText from "./ui/ThemedText";

const WIDTH = Dimensions.get("window").width;
const AnimatedGlassView = createAnimatedComponent(GlassView);

const GrokBottomSheetRenderStep = ({
  step,
  colors,
  connecting,
  onConnect,
  color,
}) => {
  const DURATION = 500;
  const scaledLogo = useSharedValue(1.5);
  const viewOpacity = useSharedValue(0);

  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaledLogo.value,
        },
      ],
    };
  });

  const viewOpacityAnim = useAnimatedStyle(() => {
    return {
      opacity: viewOpacity.value,
    };
  });

  useEffect(() => {
    if (step === "connected") {
      ((scaledLogo.value = withDelay(
        DURATION,
        withSpring(1, {
          dampingRatio: 0.4,
          mass: 0.6,
          stiffness: 300,
          overshootClamping: false,
        }),
      )),
        (viewOpacity.value = withDelay(
          DURATION * 3,
          withTiming(1, {
            duration: DURATION,
            easing: Easing.inOut(Easing.quad),
            reduceMotion: ReduceMotion.System,
          }),
        )));
    }
  }, [step]);

  switch (step) {
    case "intro":
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 14,
          }}
        >
          <View style={{ width: 100, height: 100 }}>
            <GlassView
              style={[
                styles.imageContainer,
                { backgroundColor: colors.surface, zIndex: 1 },
              ]}
              glassEffectStyle="clear"
            >
              <Image
                source={Logo}
                style={{ width: 40, height: 40 }}
                contentFit="contain"
              />
            </GlassView>
          </View>

          <ThemedText type="regular" style={{ fontWeight: "500" }}>
            Gmail
          </ThemedText>

          <GlassView
            isInteractive
            glassEffectStyle="regular"
            style={{
              width: WIDTH * 0.6,
              height: 55,
              borderRadius: 28,
              overflow: "hidden",
              backgroundColor: colors.alternateSurface,
            }}
          >
            <Pressable
              onPress={onConnect}
              style={({ pressed }) => ({
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              })}
            >
              {connecting ? (
                <Spinner color={colors.alternateText} />
              ) : (
                <ThemedText
                  colorName="alternateText"
                  style={{ fontWeight: "500", fontSize: 16 }}
                >
                  Connect
                </ThemedText>
              )}
            </Pressable>
          </GlassView>
        </View>
      );

    case "connected":
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 18,
            }}
          >
            <View style={{ width: 100, height: 100 }}>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  zIndex: 0,
                  transform: [{ translateY: 30 }],
                }}
              >
                <RadialGradient color={color} load={connecting} />
              </View>

              <AnimatedGlassView
                style={[
                  styles.imageContainer,
                  scaleAnim,
                  { backgroundColor: colors.surface, zIndex: 1 },
                ]}
                glassEffectStyle="clear"
              >
                <Image
                  source={Logo}
                  style={[{ width: 40, height: 40 }]}
                  contentFit="contain"
                />
              </AnimatedGlassView>
            </View>

            <Animated.View
              style={[
                viewOpacityAnim,
                {
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 6,
                },
              ]}
            >
              <ThemedText style={{ fontWeight: "500", fontSize: 18 }}>
                Gmail is connected
              </ThemedText>

              <ThemedText
                type="subtitle"
                colorName="textMuted"
                style={{ fontSize: 15 }}
              >
                Grok is able to use it now
              </ThemedText>
            </Animated.View>
          </View>

          <Animated.View
            style={[
              {
                paddingHorizontal: 16,
                paddingBottom: 20,
                alignItems: "center",
              },
            ]}
          >
            <GlassView
              glassEffectStyle="regular"
              isInteractive
              style={{
                width: WIDTH * 0.8,
                height: 55,
                borderRadius: 28,
                overflow: "hidden",
              }}
            >
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => ({
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <ThemedText
                  colorName="alternateSurface"
                  style={{ fontSize: 16 }}
                >
                  Chat with Grok
                </ThemedText>
              </Pressable>
            </GlassView>
          </Animated.View>
        </View>
      );

    default:
      return null;
  }
};

export default GrokBottomSheetRenderStep;

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
