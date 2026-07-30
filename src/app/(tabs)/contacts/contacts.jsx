import { Stack } from "expo-router";
import { View } from "react-native";

export default function index() {
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
