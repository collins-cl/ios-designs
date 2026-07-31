import { Stack, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  console.log(top);

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
        <ScrollView style={{ paddingTop: top + 54 }}>
          {Array.from({ length: 40 }).map((_, index) => (
            <View key={index}>
              <Text style={{ color: colors.text }}>Item {index + 1}</Text>
            </View>
          ))}
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
