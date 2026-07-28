import { StyleSheet, Text, View, useColorScheme } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "top",
  },
});
