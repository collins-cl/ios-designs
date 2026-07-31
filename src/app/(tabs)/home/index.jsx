import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="star.fill"
          onPress={() => console.log("pressed")}
        />

        <Stack.Toolbar.Button
          icon="star.fill"
          onPress={() => router.push("/testing")}
        />
      </Stack.Toolbar>

      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <Text>Hello</Text>
        </View>
      </SafeAreaView>
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
