import React from "react";
import { ScrollView, Dimensions, StyleSheet ,View } from "react-native";
import App from "./AboutUs";

const Contact = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <ScrollView>
      <View style={styles.container}>
        <App screenWidth={windowWidth} screenHeight={windowHeight} />
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    padding: 7,
  },
});
