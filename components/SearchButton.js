////////  game ---> create ////////

import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Btns from "./ButtonSearch";
import GoldGradient from "./GoldGradient";

function searchBtn({ onChange, value, ...props }) {
  // const [text, onChangeText] = useState();
  const [colorInput, setColorInput] = useState(false);
  const blur = () => setColorInput(false);
  const onFocus = () => setColorInput(true);

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colorInput ? "#FFB800CC" : "#FFFFFF",
              borderWidth: colorInput ? 2 : 0,
              fontFamily:"Anuphan-Regular"
            },
          ]}
          onChangeText={onChange}
          keyboardType="number-pad"
          placeholder="เลขที่ต้องการ"
          onFocus={onFocus}
          maxLength={6}
          onBlur={blur}
          value={value}
        />
        <GoldGradient
          style={{
            borderRadius: 7,
            borderTopLeftRadius: 0,
            backgroundColor: "#d5ab61",
            borderBottomStartRadius: 0,
          }}
        >
          <Btns text="ค้นเลย!" onPress={props.onPress} />
        </GoldGradient>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 8,
    width: "78%",
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "#ffff",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
export default searchBtn;
