import { Stack } from "expo-router";
import { View } from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

export default function index() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          icon="star.fill"
          onPress={() => console.log("pressed")}
        />
      </Stack.Toolbar>

      <View style={{ flex: 1, backgroundColor: colors.background }} />
    </>
  );
}
