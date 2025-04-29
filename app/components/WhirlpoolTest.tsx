import React, { ReactElement, useCallback, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { shuffleArray } from "./Utils";
import { PipeGameModel, WhirlpoolState } from "./WhirlpoolTypes";
import Whirlpool from "./WhirlpoolReanimated";

const WhirlpoolTest = (): ReactElement => {
  // https://docs.google.com/spreadsheets/d/10DRU4UuON-TN7QBVEpYt9qj40iuQp4_cbKx4nggbzDI/edit?gid=2131824472#gid=2131824472
  const LETTER_TO_SOUND_MATRIX = {
    words: [
      "Their",
      "Shoe",
      "Could",
      "Would",
      "Should",
      "Eight",
      "Here",
      "There",
      "Where",
      "Because",
      "Friend",
      "School",
    ],
    heartWord: "People",
  };

  const NUMBER_OF_ROUNDS = 6;
  const initPipeGameModel = (): PipeGameModel => {
    const pipeGameModel = [];
    for (let roundIndex = 0; roundIndex < NUMBER_OF_ROUNDS; ++roundIndex) {
      const shuffledMatrixWords = shuffleArray(LETTER_TO_SOUND_MATRIX.words);
      const roundWords = shuffledMatrixWords.slice(0, 5);
      roundWords.push(LETTER_TO_SOUND_MATRIX.heartWord);
      const shuffledRoundWords = shuffleArray(roundWords);
      const heartWord = shuffledRoundWords.indexOf(
        LETTER_TO_SOUND_MATRIX.heartWord
      );

      pipeGameModel.push({ words: shuffledRoundWords, heartWord: heartWord });
    }
    return pipeGameModel;
  };

  const INIT_WHIRLPOOL_STATE = {
    state: "idle",
    roundIndex: 0,
    heartWord: "",
    wordPressed: "",
    heartWordPressed: false,
    pass: true,
    complete: false,
  };

  const [action, setAction] = useState("");
  const [whirlpoolState, setWhirlpoolState] =
    useState<WhirlpoolState>(INIT_WHIRLPOOL_STATE);

  const whirlpoolStateCallback = useCallback(
    (newWhirlpoolState: WhirlpoolState) => {
      setWhirlpoolState(newWhirlpoolState);
      console.log("newWhirlpoolState", newWhirlpoolState);

      setAction("");

      /*
        switch(newWhirlpoolState.state) {
            case 'loaded': 
                setAction('injectGameModel');
                break;
            case 'roundReady':
                setAction('injectShowWords');
                break;
            case 'showWords':
                // setGameState(prev => ({...prev, heartWord: newWhirlpoolState.heartWord}));
                setAction('injectStartSelection');
                break;
            case 'startSelection':
                //setGameState(prev => ({...prev, timer: 10}));
                setAction('');
                break;
            case 'wordSelected':
                setAction('injectHideWords');
                break;
            case 'hideWords':
                setAction('injectNextRound');
                break;
            case 'roundExpired':
                setAction('injectShowWords');
                break;
            default:
                setAction('');
        }
        */
    },
    [setWhirlpoolState, setAction]
  );

  const wordOnPressCallback = useCallback(
    (wordPressed: string, heartWordPressed: boolean) => {
      console.log(
        "wordOnPress() heartWordPressed: ",
        wordPressed,
        heartWordPressed
      );
      //setGameState(prev => ({...prev, score: heartWordPressed ? prev.score + 5 : prev.score}));
      //setAction('injectHideWords');
    },
    [setAction]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhirlpoolTest</Text>
      <Whirlpool
        pipeGameModel={initPipeGameModel()}
        action={action}
        whirlpoolStateCallback={whirlpoolStateCallback}
        wordOnPress={wordOnPressCallback}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setAction("ShowWords");
          }}
        >
          <Text style={styles.button}>Show Words</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAction("StartSelection");
          }}
        >
          <Text style={styles.button}>Start Selection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAction("StopSelection");
          }}
        >
          <Text style={styles.button}>Stop Selection</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setAction("ShakeIncorrectWord");
          }}
        >
          <Text style={styles.button}>Shake IncorrectWord</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAction("ShowCorrectWord");
          }}
        >
          <Text style={styles.button}>Show Correct Word</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setAction("HideWords");
          }}
        >
          <Text style={styles.button}>Hide Words</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {" "}
        <TouchableOpacity
          onPress={() => {
            setAction("NextRound");
          }}
        >
          <Text style={styles.button}>Next Round</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 40,
  },
  button: {
    fontSize: 20,
    backgroundColor: "#fff",
  },
});
export default WhirlpoolTest;
