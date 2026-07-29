import { Button, Host, ScrollView } from "@expo/ui";
import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();

  return (
    <Host
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView style={{ padding: 16 }}>
        <Button
          style={styles.button}
          onPress={() => {
            router.push("/glassview");
          }}
        >
          <Text
            style={{
              color: colors.text,
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
