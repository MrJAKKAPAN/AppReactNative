import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GreyGradient({ children, style }) {
  return (
    <View style={[style]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.7 }}
        locations={[0, 1]}
        colors={["#e9e9e9", "#c2c2c2"]}
        style={[style]}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
