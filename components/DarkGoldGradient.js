import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function DarkGoldGradient({ children, style}) {
  return (
    <View style={[style]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[1,0,1,0]}
        colors={["#b18c4b","#b39554","#c5a869", "#c79c52"]}
        style={[style]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
