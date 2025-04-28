import { StyleSheet, Text, View } from "react-native";

const Screen = () => {
  return (
    <View style={styles.container}>
      <Text>Screen</Text>
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
