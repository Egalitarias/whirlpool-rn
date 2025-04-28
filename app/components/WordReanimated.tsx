import React, { useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type WordPosition = {
  angle: number;
  radius: number;
};
type WordReanimated = {
  word: string;
  wordIndex: number;
  wordPosition: WordPosition;
};

const WordReanimated = ({ word, wordIndex, wordPosition }: WordReanimated) => {
  const wordAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          Math.cos(
            (wordIndex * Math.PI) / 3 + wordPosition.angle + (Math.PI * 5) / 3
          ) *
            wordPosition.radius -
          40,
      },
      {
        translateY:
          Math.sin(
            (wordIndex * Math.PI) / 3 + wordPosition.angle + (Math.PI * 5) / 3
          ) *
            wordPosition.radius -
          40,
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
    backgroundColor: "#00000000",
  },
  word: {
    position: "absolute",
    padding: 10,
    borderWidth: 3,
    backgroundColor: "#00000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  touch: {
    backgroundColor: "#33333333",
  },
});

export default WordReanimated;
