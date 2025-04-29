import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

import WhirlpoolReanimatedTest from "../components/WhirlpoolReanimatedTest";

const Screen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <WhirlpoolReanimatedTest />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screen;
