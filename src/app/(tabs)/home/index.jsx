import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../../../components/ui/ThemedText";
import { useTheme } from "../../../theme/ThemeProvider";

const RoutingOptions = [
  {
    id: 1,
    title: `telegram chats menu`,
    href: "/telegram",
  },
  {
    id: 2,
    title: `grok screen`,
    href: "/grokScreen",
  },
];

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = Math.round(event.contentOffset.y);
  });
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />

      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button>
          <Stack.Toolbar.Label>Edit</Stack.Toolbar.Label>
        </Stack.Toolbar.Button>
      </Stack.Toolbar>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="plus.circle"
          onPress={() => console.log("pressed")}
        />

        <Stack.Toolbar.Button
          icon="square.and.pencil"
          onPress={() => router.push("/testing")}
        />
      </Stack.Toolbar>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          style={{
            flex: 1,
            paddingTop: top + 64,
            marginBottom: 10,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {RoutingOptions.map((route, index) => (
              <Pressable
                key={index}
                style={[{ borderColor: colors.primary }, styles.button]}
                onPress={() => router.push(`${route.href}`)}
              >
                <ThemedText colorName="text" type="default">
                  {route.title}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </Animated.ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "top",
  },

  button: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  headerContainer: {
    flex: 1,
  },

  headerTopContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
