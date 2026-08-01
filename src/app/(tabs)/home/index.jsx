import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../../../components/ui/ThemedText";
import { useTheme } from "../../../theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: top + 54,
            marginBottom: 10,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Array.from({ length: 40 }).map((_, index) => (
              <View key={index} style={{ width: 200, height: 40 }}>
                <Pressable
                  style={{
                    width: 200,
                    height: 40,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => console.log("hello", index + 1)}
                >
                  <ThemedText colorName="primary" type="default">
                    Link to this
                  </ThemedText>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
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
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
