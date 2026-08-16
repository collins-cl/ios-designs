import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Logo from "../../../assets/app-svgs/Gmail.svg";
import GlassButton from "../../components/ui/GlassButton";
import Spinner from "../../components/ui/Spinner";
import ThemedText from "../../components/ui/ThemedText";
import { useTheme } from "../../theme/ThemeProvider";

const index = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [step, setStep] = useState("intro");
  const [connecting, setConnecting] = useState(false);

  const handleConnect = useCallback(() => {
    setConnecting(true);
    setTimeout(() => {
      setStep("connected");
    }, 1000);
  });

  const renderStep = () => {
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
            <GlassView
              style={[
                styles.imageContainer,
                { backgroundColor: colors.surface },
              ]}
              glassEffectStyle="regular"
            >
              <Image
                source={Logo}
                style={{ width: 40, height: 40 }}
                contentFit="contain"
              />
            </GlassView>

            <ThemedText type="regular" style={{ fontWeight: "500" }}>
              Gmail
            </ThemedText>

            <GlassView
              isInteractive
              glassEffectStyle="regular"
              style={{
                width: width * 0.6,
                height: 55,
                borderRadius: 28,
                overflow: "hidden",
                backgroundColor: colors.alternateSurface,
              }}
            >
              <Pressable
                onPress={handleConnect}
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
              <GlassView
                style={[styles.imageContainer]}
                glassEffectStyle="regular"
              >
                <Image
                  source={Logo}
                  style={{ width: 40, height: 40 }}
                  contentFit="contain"
                />
              </GlassView>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 6,
                }}
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
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 20,
                alignItems: "center",
              }}
            >
              <GlassView
                glassEffectStyle="regular"
                isInteractive
                style={{
                  width: width * 0.8,
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
            </View>
          </View>
        );
      default:
        return null;
    }
  };

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
        {renderStep()}

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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
