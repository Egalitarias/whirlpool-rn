import React, { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

import WhirlpoolReanimated from "../components/WhirlpoolReanimated";
import WhirlpoolTest from "../components/WhirlpoolTest";

const Screen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <WhirlpoolTest />
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
