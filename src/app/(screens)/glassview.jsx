import { GlassView } from "expo-glass-effect";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AnimatedGlassStyleExample() {
  const [visible, setVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop",
        }}
      />

      <GlassView
        style={styles.glassView}
        glassEffectStyle={{
          style: visible ? "clear" : "none",
          animate: true,
          animationDuration: 0.5,
        }}
      >
        <Text style={styles.glassText}>Liquid glass preview</Text>
      </GlassView>

      <Pressable
        style={styles.toggleButton}
        onPress={() => setVisible((prev) => !prev)}
      >
        <Text style={styles.toggleButtonText}>
          {visible ? "Hide" : "Show"} Glass Effect
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  glassView: {
    position: "absolute",
    top: 140,
    left: 32,
    width: 260,
    height: 140,
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  glassText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  toggleButton: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
