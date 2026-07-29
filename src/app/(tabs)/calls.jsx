import { Host, ScrollView } from "@expo/ui";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const calls = () => {
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
            Calls
          </Text>
        </View>
      </ScrollView>
    </Host>
  );
};

export default calls;

const styles = StyleSheet.create({});
