import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="star.fill"
          onPress={() => console.log("pressed")}
        />
      </Stack.Toolbar>

      <View style={{ flex: 1 }} />
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
