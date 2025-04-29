import React, { ReactElement, useCallback, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { WhirlpoolState } from "./WhirlpoolTypes";
import Whirlpool from "./WhirlpoolReanimated";

const WhirlpoolTest = (): ReactElement => {
  const INIT_PIPE_GAME_MODEL = [
    { words: ["About", "Far", "Laugh", "Shall", "Better"], heartWord: 3 },
    { words: ["Full", "Light", "Show", "Bring", "Today"], heartWord: 1 },
    { words: ["Got", "Long", "Six", "Carry", "Grow"], heartWord: 2 },
    { words: ["Much", "Small", "Clean", "Hold", "Own"], heartWord: 0 },
    { words: ["Myself", "Start", "Cut", "Hot", "Never"], heartWord: 4 },
    { words: ["Ten", "Done", "Hurt", "Only", "Done"], heartWord: 2 },
  ];
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
        pipeGameModel={INIT_PIPE_GAME_MODEL}
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
