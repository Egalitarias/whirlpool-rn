import React, { useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type WordReanimated = {
  word: string;
};

const WordReanimated = ({ word }: WordReanimated) => {
  const angle = useSharedValue<number>(0);
  const radius = useSharedValue<number>(180);

  const spinWords = useCallback(() => {
    angle.value = withRepeat(
      withTiming(Math.PI * 2, { duration: 30000, easing: Easing.linear }),
      -1
    );
  }, []);

  useEffect(() => {
    spinWords();
  }, [spinWords]);

  const wordAnimatedStyle = useAnimatedStyle(() => ({
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
    <TouchableOpacity
      onPress={() => {
        console.log(word);
      }}
    >
      <Animated.Text style={[styles.word, wordAnimatedStyle]}>
        {word}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11111111",
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

export default WordReanimated;
