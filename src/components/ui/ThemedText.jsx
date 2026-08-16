import { StyleSheet, Text } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function ThemedText({
  style,
  colorName = "text",
  type = "default",
  ...rest
}) {
  const { colors } = useTheme();
  const textColor = { color: colors[colorName] ?? colors.text };

  return <Text style={[textColor, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontFamily: "Inter",
  },
  regular: {
    fontSize: 20,
    fontFamily: "Inter",
  },
  title: {
    fontSize: 24,
    fontFamily: "InterBold",
  },
  semiBold: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
  },
  bold: {
    fontSize: 18,
    fontFamily: "InterBold",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "InterRegular",
  },
});
