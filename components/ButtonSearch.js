////////  game ---> create ////////
import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import {CustomText} from "../components/CustomText"

 function ButtonSearch(props) {
  const { text, color, onPress } = props;
      const content = (
        <View
          style={[
            styles.button,
            {
              backgroundColor: color,
            },
          ]}
        >
          <CustomText style={styles.text}>{text}</CustomText>
        </View>
      );
      return <TouchableHighlight onPress={onPress}>{content}</TouchableHighlight>;
}

const styles = StyleSheet.create({
    button: {
      padding: 5,
      borderRadius: 5,
      alignItems: "center",
      borderTopStartRadius:0,
      backgroundColor: "#e6e6e6",
      borderBottomStartRadius:0,
    },
    text: {
      padding: 10,
      fontSize: 16,
      color: "#000",
    },
 });

export default ButtonSearch