import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

function CustomText({ children, style }) {
  return (
    <View style={{ flexWrap: "nowrap" }}>
      <Text style={[styles.text, style, { fontFamily: "Anuphan-Regular" }]}>
        {children}
      </Text>
    </View>
  );
}

function CustomTextBold({ children, style }) {
  return (
    <View style={{ flexWrap: "nowrap" }}>
      <Text style={[styles.text, style, { fontFamily: "Anuphan-SemiBold" }]}>
        {children}
      </Text>
    </View>
  );
}
function CustomTextBlue({ children, style }) {
  return (
    <View style={{ flexWrap: "nowrap" }}>
      <Text
        style={[
          styles.text,
          { fontFamily: "Anuphan-SemiBold", color: "#0b2760" },
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: "#ffff",
    
  },
});

export { CustomTextBold, CustomText, CustomTextBlue };
