import { Host, ScrollView } from "@expo/ui";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

const search = () => {
  const { colors } = useTheme();
  return (
    <Host style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ color: colors.text, fontSize: 18 }}>hiiii</Text>
      </ScrollView>
    </Host>
  );
};

export default search;

const styles = StyleSheet.create({});
