import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({ title, left, right }) {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: top + 44,
        paddingTop: top,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <View>{left}</View>

      <View>{right}</View>
    </View>
  );
}
