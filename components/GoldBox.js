////////  game ---> create ////////
import React from "react";
import { View } from "react-native";

const GoldBox = ({ children }) => {
  return (
    <View
      style={{
        padding: 8,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#b58f51",
      }}
    >
      {children}
    </View>
  );
};
export default GoldBox;
