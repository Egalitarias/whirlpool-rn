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
  const words = ["Word0", "Word1", "Word2", "Word3", "Word4", "Word5"];
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

  return (
    <View style={styles.container}>
      <View style={styles.whirlpool}>
        {words.map((word, index) => (
          <WordReanimated
            key={index}
            word={word}
            wordIndex={index}
            wordPosition={{ angle: angle.value, radius: radius.value }}
          />
        ))}
      </View>
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
