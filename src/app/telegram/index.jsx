import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../../components/ui/ThemedText";
import { useTheme } from "../../theme/ThemeProvider";

const HEADER_HEIGHT = 62;
const TOTAL_HEIGHT = HEADER_HEIGHT + 150;
const MAX_TRANSLATE_X_VALUE = 40;
const COLLAPSE_AT = 15;
const EXPAND_AT = 20;
const items = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  label: `Message ${index + 1}`,
}));
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

const index = () => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const translateX = useSharedValue(0);
  const lastScrollY = useSharedValue(0);
  const isCollapsed = useSharedValue(false);
  const avatarTranslateY = useSharedValue(0);
  const avatarScale = useSharedValue(1);
  const avatarOpacity = useSharedValue(1);
  const marginRight = useSharedValue(8);

  const onScroll = useAnimatedScrollHandler((event) => {
    const currentY = Math.round(event.contentOffset.y);
    const clampedY = Math.max(0, currentY);
    console.log(currentY);

    if (clampedY > lastScrollY.value) {
      translateX.value = withSpring(MAX_TRANSLATE_X_VALUE);
    } else if (clampedY < lastScrollY.value) {
      translateX.value = withSpring(0);
    }
    lastScrollY.value = clampedY;

    if (currentY > COLLAPSE_AT && !isCollapsed.value) {
      isCollapsed.value = true;
      avatarTranslateY.value = withSpring(-20);
      avatarScale.value = withSpring(0.8);
      marginRight.value = withSpring(-12);
    } else if (currentY <= EXPAND_AT && isCollapsed.value) {
      isCollapsed.value = false;
      avatarTranslateY.value = withSpring(0);
      avatarScale.value = withSpring(1);
      marginRight.value = withSpring(8);
    } else if (currentY <= -30 && !isCollapsed.value) {
      isCollapsed.value = true;
      avatarScale.value = withSpring(1.3);
      marginRight.value = withSpring(-2);
    }
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

  const avatarStyle = useAnimatedStyle(() => ({
    marginRight: marginRight.value,
    opacity: avatarOpacity.value,
    transform: [
      { translateY: avatarTranslateY.value },
      { scale: avatarScale.value },
    ],
  }));

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: TOTAL_HEIGHT - 12,
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statusContainer}
            style={{ marginHorizontal: 0 }}
          >
            {Array.from({ length: 15 }, (_, index) => (
              <Animated.View
                key={index}
                style={[
                  avatarStyle,
                  styles.statusAvatar,
                  index === 14 && styles.statusAvatarLast,
                ]}
              />
            ))}
          </ScrollView>
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    overflow: "hidden",
  },

  headerContainer: {
    height: 40,
    marginTop: HEADER_HEIGHT,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusContainer: {
    flexGrow: 1,
    height: 95,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingRight: 24,
  },

  statusAvatar: {
    width: 65,
    height: 65,
    backgroundColor: "red",
    borderRadius: 50,
    marginRight: 8,
  },

  statusAvatarLast: {
    marginRight: 0,
  },
});
