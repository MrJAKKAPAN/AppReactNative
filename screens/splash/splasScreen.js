////////  game ---> create ////////

import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

export default function App({ navigation }) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("Home")
  //   },2000)
  // }, [])

  return (
    <View
      style={{
        flex: 1,
        zIndex: 999,
        alignItems: "center",
        absolute: "absolute",        
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ resizeMode: "stretch" ,width:250, height:30}}
        />
    </View>
  );
}
