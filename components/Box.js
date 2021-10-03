import React from "react";
import { View } from "react-native";

const Box = ({ children }) => {
  return (
    <View
      style={{
        borderRadius: 8,
        margin: 8,
        backgroundColor: "#0092d2",
        width: "100%",
      }}
    >
      {children}
    </View>
  );
};
export default Box;


////// delete ตรวจสอบน่าไหนใช้บ้าง
