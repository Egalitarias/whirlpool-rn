import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

import WhirlpoolReanimated from "../components/WhirlpoolReanimated";

const Screen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <WhirlpoolReanimated />
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
