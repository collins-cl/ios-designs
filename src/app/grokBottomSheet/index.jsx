import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "../../components/ui/ThemedText";

const index = () => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={{ paddingTop: top }}>
        <ThemedText>Hello</ThemedText>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
