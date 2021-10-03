import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import GoldGradient from "../components/GoldGradient";
import GreyGradient from "../components/GreyGradient";

const ButtonGray = (props) => {
  const content = (
      
      <GoldGradient
        style={[
          styles.button,
        ]}
      >
        <Text style={styles.text}>{props.text}</Text>
      </GoldGradient>
  );
  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={props.onPress}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { padding: 5, width: "100%", borderRadius: 5, alignItems: "center" },
  text: {
    padding: 10,
    fontSize: 16,
    color: "#000",
    fontFamily: "Anuphan-Regular",
  },
});

export default ButtonGray;