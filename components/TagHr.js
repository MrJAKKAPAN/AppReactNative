////////  game ---> create ////////
//ขีดกลางสีขาว
import React from "react";
import { StyleSheet, View,  } from "react-native";

const TagHr = (props) => {
  return (
    <View
      style={[
        styles.hr,
        {
          padding: props.paddings,
          marginTop: props.marginTop,
          marginButtom: props.marginButtom,
        },
      ]}
    >
      <View style={styles.InHr} />
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    flexDirection: "row",
    alignItems: "center",
  },
  InHr: {
    flex: 1,
    height: 2,
    backgroundColor: "#fff",
  },
});

export default TagHr;
