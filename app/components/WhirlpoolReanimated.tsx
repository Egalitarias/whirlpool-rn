import React, { useCallback, ReactElement, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import WordReanimated from "./WordReanimated";

const WhirlpoolReanimated = (): ReactElement => {
  const angle = useSharedValue<number>(0);
  const radius = useSharedValue<number>(180);

  const pullWordsIn = useCallback(() => {
    radius.value = withRepeat(withTiming(50, { duration: 1000 }), 1, true);
  }, []);

  const pushWordsOut = useCallback(() => {
    radius.value = withRepeat(withTiming(180, { duration: 1000 }), 1, true);
  }, []);

  const spinWords = useCallback(() => {
    angle.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 30000, easing: Easing.linear }),
      -1
    );
  }, []);

  useEffect(() => {
    spinWords();
  }, [spinWords]);

  const word0AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: Math.cos(angle.value) * radius.value - 40 },
      { translateY: Math.sin(angle.value) * radius.value - 40 },
    ],
  }));

  const word1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: Math.cos(angle.value + Math.PI / 3) * radius.value - 40 },
      { translateY: Math.sin(angle.value + Math.PI / 3) * radius.value - 40 },
    ],
  }));

  const word2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          Math.cos(angle.value + (Math.PI * 2) / 3) * radius.value - 40,
      },
      {
        translateY:
          Math.sin(angle.value + (Math.PI * 2) / 3) * radius.value - 40,
      },
    ],
  }));

  const word3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          Math.cos(angle.value + (Math.PI * 3) / 3) * radius.value - 40,
      },
      {
        translateY:
          Math.sin(angle.value + (Math.PI * 3) / 3) * radius.value - 40,
      },
    ],
  }));

  const word4AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          Math.cos(angle.value + (Math.PI * 4) / 3) * radius.value - 40,
      },
      {
        translateY:
          Math.sin(angle.value + (Math.PI * 4) / 3) * radius.value - 40,
      },
    ],
  }));

  const word5AnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          Math.cos(angle.value + (Math.PI * 5) / 3) * radius.value - 40,
      },
      {
        translateY:
          Math.sin(angle.value + (Math.PI * 5) / 3) * radius.value - 40,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={styles.whirlpool}>
        <TouchableOpacity
          onPress={() => {
            pullWordsIn();
            console.log("Word0");
          }}
        >
          <Animated.Text style={[styles.word, word0AnimatedStyle]}>
            Word0
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            pushWordsOut();
            console.log("Word1");
          }}
        >
          <Animated.Text style={[styles.word, word1AnimatedStyle]}>
            Word1
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Word2");
          }}
        >
          <Animated.Text style={[styles.word, word2AnimatedStyle]}>
            Word2
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Word3");
          }}
        >
          <Animated.Text style={[styles.word, word3AnimatedStyle]}>
            Word3
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Word4");
          }}
        >
          <Animated.Text style={[styles.word, word4AnimatedStyle]}>
            Word4
          </Animated.Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Word5");
          }}
        >
          <WordReanimated word={"Word5"} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whirlpool: {
    justifyContent: "center",
    alignItems: "center",
    width: 500,
    height: 500,
    backgroundColor: "#11111111",
    borderRadius: 250,
  },
  word: {
    position: "absolute",
    padding: 10,
    borderWidth: 3,
    backgroundColor: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WhirlpoolReanimated;
