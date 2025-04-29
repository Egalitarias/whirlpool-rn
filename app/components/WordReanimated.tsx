import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { RoundModel } from "./WhirlpoolTypes";

export type WordPosition = {
  angle: SharedValue<number>;
  radius: SharedValue<number>;
};

/*
type WordProps = {
    round: RoundModel;
    wordIndex: number;
    wordOnPress: (wordPressed: string, heartWordPressed: boolean) => void;
    wordPosition: WordPosition;
    wordCircleDiameter: number;
    action: string;
};
*/

type WordReanimatedProps = {
  round: RoundModel;
  wordIndex: number;
  wordOnPress: (wordPressed: string, heartWordPressed: boolean) => void;
  wordPosition: WordPosition;
  action: string;
};

const WordReanimated = ({
  round,
  wordIndex,
  wordPosition,
  wordOnPress,
  action,
}: WordReanimatedProps) => {
  const word = round.words[wordIndex];
  const heartWord = round.words[round.heartWord];

  const progress = useSharedValue<number>(0);
  const shakeTranslateX = useSharedValue<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [pressed, setPressed] = useState<boolean>(false);

  useEffect(() => {
    switch (action) {
      case "ShowWords":
        {
          setDisabled(true);
          progress.value = withTiming(1.0, { duration: 5000 });
        }
        break;
      case "StartSelection":
        {
          setDisabled(false);
        }
        break;
      case "StopSelection":
        {
          setDisabled(true);
        }
        break;
      case "ShakeIncorrectWord":
        {
          if (pressed && word !== heartWord) {
            shakeAnimation();
          }
        }
        break;
      case "ShowCorrectWord":
        {
          if (word === heartWord) {
            setDisabled(false);
            setPressed(true);
          } else {
            setDisabled(true);
            progress.value = withTiming(0.0, { duration: 5000 });
          }
        }
        break;
      case "HideWords":
        {
          setDisabled(true);
          progress.value = withTiming(0.0, { duration: 5000 });
        }
        break;
      case "NextRound":
        {
          setPressed(false);
        }
        break;
    }
  }, [action, setDisabled, progress]);

  const shakeAnimation = useCallback(() => {
    const shakeSpeed = { duration: 100 };
    const translateDistance = 10;
    const numberOfShakes = 3;
    shakeTranslateX.value = withSequence(
      withTiming(translateDistance, shakeSpeed),
      withRepeat(
        withTiming(translateDistance * -1, shakeSpeed),
        numberOfShakes,
        true
      ),
      withTiming(0, shakeSpeed)
    );
  }, [shakeTranslateX]);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslateX.value }],
    };
  });

  const tap = Gesture.Tap()
    .onBegin(() => {
      console.log("onBegin()");
    })
    .onFinalize(() => {
      "worklet";
      console.log("onFinalize()");
      setPressed(true);
      runOnJS(wordOnPress)(word, word === heartWord);
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
