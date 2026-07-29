import { Button, Host, ScrollView } from "@expo/ui";
import {
  buttonBorderShape,
  buttonStyle,
  controlSize,
  labelStyle,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
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
      <ScrollView style={{ padding: 8 }}>
        <Button
          systemImage="gear"
          modifiers={[labelStyle("iconOnly"), tint("#FF6347")]}
          onPress={() => {
            router.push("/glassview");
          }}
          label="hello world"
        />
        <Button label="Bordered" modifiers={[buttonStyle("bordered")]} />
        <Button
          label="Bordered Prominent"
          modifiers={[buttonStyle("borderedProminent")]}
        />
        <Button label="Borderless" modifiers={[buttonStyle("borderless")]} />
        <Button
          label="hive"
          role="Cancel"
          modifiers={[
            buttonStyle("glass"),
            buttonBorderShape("circle"),
            controlSize("extraLarge"),
          ]}
        />
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
