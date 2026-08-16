import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GrokSvg from "../../components/ui/GrokSvg";
import { useTheme } from "../../theme/ThemeProvider";

const index = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  const router = useRouter();
  const sheetRef = useRef();

  const openSheet = () => {
    sheetRef.current?.present();
  };
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
        <Pressable onPress={() => router.push("/grokBottomSheet")}>
          <GrokSvg size={70} />
        </Pressable>
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
