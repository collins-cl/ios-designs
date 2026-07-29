import { Host, ScrollView } from "@expo/ui";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const settings = () => {
  const { colors } = useTheme();

  return (
    <Host
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView style={{ padding: 16 }}>
        <View>
          <Text
            style={{
              color: colors.text,
              fontFamily: "Inter",
              fontSize: 18,
              fontWeight: "condensed",
            }}
          >
            Hello, world!
          </Text>
        </View>
      </ScrollView>
    </Host>
  );
};

export default settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "top",
  },
});
