import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GrokSvg from "../../components/ui/GrokSvg";
import { useTheme } from "../../theme/ThemeProvider";

const index = () => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View
        style={[
          { paddingTop: top, flex: 1, backgroundColor: colors.background },
          styles.screenView,
        ]}
      >
        <View>
          <GrokSvg />
        </View>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  screenView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
