import { Stack, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import Logo from "../../../assets/app-svgs/Gmail.svg";
import GlassButton from "../../components/ui/GlassButton";
import { useTheme } from "../../theme/ThemeProvider";

const index = () => {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.surface,
          },
        }}
      />

      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            padding: 8,
            paddingTop: 50,
          }}
        >
          <View>
            <View>
              <Image
                source={Logo}
                style={{ width: 48, height: 48 }}
                contentFit="contain"
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: "absolute",
            top: 16,
            left: 8,
            zIndex: 10,
          }}
        >
          <GlassButton onPress={() => router.dismiss()} />
        </View>
      </View>
    </>
  );
};

export default index;

const styles = StyleSheet.create({});
