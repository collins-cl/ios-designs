import { Host, ScrollView } from "@expo/ui";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const settings = () => {
  const colorScheme = useColorScheme();

  return (
    <Host
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      }}
    >
      <ScrollView>
        <View>
          <Text
            style={{
              color: colorScheme === "dark" ? "#fff" : "#000",
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
