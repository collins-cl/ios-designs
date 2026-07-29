import { Button, Host, ScrollView } from "@expo/ui";
import { router } from "expo-router";
import { StyleSheet, Text, useColorScheme } from "react-native";

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <Host
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      }}
    >
      <ScrollView>
        <Button
          style={styles.button}
          onPress={() => {
            router.push("/glassview");
          }}
        >
          <Text
            style={{
              color: colorScheme === "dark" ? "#fff" : "#000",
              fontFamily: "Inter",
              fontSize: 20,
              fontWeight: "condensed",
            }}
          >
            Hello, world!
          </Text>
        </Button>
      </ScrollView>
    </Host>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "top",
  },

  button: {
    width: 200,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
