import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button icon="zl.rectangle.roundedtop.fill" />
      </Stack.Toolbar>
      <View>
        <Text>index</Text>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
