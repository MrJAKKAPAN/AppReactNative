////////  game ---> create ////////
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

const UselessTextInput = (props) => {
  return (
    <TextInput {...props} editable={false} placeholder={props.placeholder} />
  );
};

function ChooseFile(props) {
  const content = (
    <View
      style={[
        styles.button,
        {
          backgroundColor: props.color,
          width: props.width,
          marginTop: props.marginTop,
        },
      ]}
    >
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 3,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={props.onPress}
      >
        {content}
        <UselessTextInput placeholder={props.placeholder}>
          <Text>{props.plchoices}</Text>
        </UselessTextInput>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    width: "30%",
    borderRadius: 3,
    alignItems: "flex-start",
  },
  text: {
    padding: 2,
    fontSize: 12,
    paddingEnd: 8,
    color: "#000",
    paddingStart: 8,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#000",
    backgroundColor: "#E9E9E9",
  },
});

export default ChooseFile;
