import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c2c2c2",
    alignItems: "center",
    borderRadius: 5,
    width: 150,
    padding: 5,
  },
  text: {
    color: "#000",
    fontSize: 16,
    padding: 10,
  },
});

const ButtonGray = (props) => {
  const content = (
    <View style={styles.button}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
  return <TouchableOpacity onPress={props.press}>{content}</TouchableOpacity>;
};

export default ButtonGray;
