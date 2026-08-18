import { Stack } from "expo-router";
import { View } from "react-native";
import RadialGradient from "../../../components/RadialGradient";
import { useTheme } from "../../../theme/ThemeProvider";

export default function index() {
  const { colors } = useTheme();

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
        <RadialGradient />
      </View>
    </>
  );
}
