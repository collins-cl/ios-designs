import { ScrollView } from "@expo/ui";
import { Host, Text } from "@expo/ui/swift-ui";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function Index() {
  const { colors } = useTheme();

  return (
    <>
      {/* <Header
        left={
          <Host matchContents>
            <Button
              label="Edit"
              modifiers={[buttonStyle("glass"), controlSize("large")]}
            />
          </Host>
        }
        right={
          <Host matchContents>
            <Button modifiers={[buttonStyle("glass"), controlSize("large")]}>
              <HStack>
                <Text>hehe</Text>
              </HStack>
            </Button>
          </Host>
        }

      /> */}

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button icon="a.book.closed" />
      </Stack.Toolbar>

      <Host
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <ScrollView
          showsIndicators={false}
          style={{
            paddingTop: 54,
            paddingHorizontal: 16,
            paddingBottom: 20,
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <Text key={i} style={{ color: colors.text, marginBottom: 2 }}>
              Chat {i}
            </Text>
          ))}
        </ScrollView>
      </Host>
    </>
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
