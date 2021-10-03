////////  game ---> create ////////

import React from "react";
import { View } from "react-native";

const BuleBox = ({ children }) => {
  return (
    <View
      style={{
        padding: 8,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0092d2",
      }}
    >
      {children}
    </View>
  );
};
export default BuleBox;
