import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { MotiView, MotiImage } from "moti"; // for animation (Framer Motion alternative)

const { width, height } = Dimensions.get("window");

const bgImages = [
  require("../assets/images/bg1.jpg"),
  require("../assets/images/bg2.jpg"),
  require("../assets/images/bg3.jpg"),
  require("../assets/images/bg4.jpg"),
  require("../assets/images/bg5.jpg"),
];

const INTERVAL_MS = 5000;

export default function Index() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % bgImages.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background carousel */}
      {bgImages.map((src, i) => {
        const isActive = i === index;
        return (
          <MotiView
            key={i}
            style={[
              StyleSheet.absoluteFill,
              { opacity: isActive ? 1 : 0 },
            ]}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ type: "timing", duration: 1000 }}
          >
            <ImageBackground
              source={src}
              style={styles.background}
              resizeMode="cover"
            >
              {/* Dark overlay */}
              <View style={styles.overlay} />
            </ImageBackground>
          </MotiView>
        );
      })}

      {/* Foreground content */}
      <View style={styles.foreground}>
        <MotiImage
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
          from={{ opacity: 0, translateY: -50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 1000 }}
          resizeMode="contain"
        />
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 1000, delay: 500 }}
        >
          <Text style={styles.title}>Aab-O-Hawa</Text>
        </MotiView>
        <Text style={styles.subtitle}>✨Preserving Nature, Protecting Tomorrow✨</Text>

        {/* Manual controls */}
        <View style={styles.dotsContainer}>
          {bgImages.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setIndex(i)}
              style={[
                styles.dot,
                i === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
  },
  foreground: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: -20,
    marginTop: -40,
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#00BFA6", // matches "text-primary"
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    maxWidth: 300,
    marginTop: 8,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: "white",
    width: 24,
  },
  inactiveDot: {
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 10,
  },
});