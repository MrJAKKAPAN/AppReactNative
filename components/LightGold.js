////////  game ---> สร้าง ////////
import React from "react";
import { View } from "react-native";

const LightGold = ({ children }) => {
  return (
    <View
      style={{
        padding: 8,
        width: "100%",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f0df",
      }}
    >
      {children}
    </View>
  );
};
export default LightGold;
