import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import Animated, {
  clamp,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../../components/ui/ThemedText";
import { useTheme } from "../../theme/ThemeProvider";

const HEADER_HEIGHT = 62;
const TOTAL_HEIGHT = 62 + 56;
const MAX_TRANSLATE_X_VALUE = 40;
const items = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  label: `Message ${index + 1}`,
}));
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

const index = () => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  //   const translateX = useSharedValue(0);
  const lastScrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    lastScrollY.value = Math.round(event.contentOffset.y);
    console.log(lastScrollY.value);
  });

  const translateX = useDerivedValue(() => {
    return clamp(lastScrollY.value, 0, MAX_TRANSLATE_X_VALUE);
  });

  const titleTransfomAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: TOTAL_HEIGHT,
            paddingHorizontal: 16,
            paddingBottom: 24,
          }}
        >
          {items.map((item) => (
            <View key={item.id} style={{ paddingVertical: 8 }}>
              <ThemedText colorName="text">{item.label}</ThemedText>
            </View>
          ))}
        </Animated.ScrollView>

        <Animated.View style={styles.header}>
          <Animated.View style={styles.headerContainer}>
            <ThemedText colorName="primary">left</ThemedText>
            <AnimatedThemedText
              style={titleTransfomAnim}
              colorName="primary"
              type="bold"
            >
              Chats
            </AnimatedThemedText>
            <ThemedText colorName="primary">right</ThemedText>
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: TOTAL_HEIGHT,
    backgroundColor: "lightgrey",
  },

  headerContainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: HEADER_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
