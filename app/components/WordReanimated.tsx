import React from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { WhirlpoolState } from "./WhirlpoolTypes";

export type WordPosition = {
  angle: SharedValue<number>;
  radius: SharedValue<number>;
};

type WordReanimatedProps = {
  word: string;
  wordIndex: number;
  wordPosition: WordPosition;
  whirlPoolEvent: (whirlpoolState: WhirlpoolState) => void;
};

const WordReanimated = ({
  word,
  wordIndex,
  wordPosition,
  whirlPoolEvent,
}: WordReanimatedProps) => {
  const pressed = useSharedValue<boolean>(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      console.log("onBegin()");
      pressed.value = true;
    })
    .onFinalize(() => {
      "worklet";
      console.log("onFinalize()");
      runOnJS(whirlPoolEvent)({ wordPressed: word });
      pressed.value = false;
    });

  const wordAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          Math.cos(
            (wordIndex * Math.PI) / 3 +
              wordPosition.angle.value +
              (Math.PI * 5) / 3
          ) * wordPosition.radius.value,
      },
      {
        translateY:
          Math.sin(
            (wordIndex * Math.PI) / 3 +
              wordPosition.angle.value +
              (Math.PI * 5) / 3
          ) * wordPosition.radius.value,
      },
    ],
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.Text style={[styles.word, wordAnimatedStyle]}>
        {word}
      </Animated.Text>
    </GestureDetector>
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
