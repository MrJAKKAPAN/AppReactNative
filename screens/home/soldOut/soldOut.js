import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions
} from "react-native";
import { WebView } from "react-native-webview";

export default SoldOut = (props) => {
  const [source, setSoure] = useState();

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const pictureFrame = screenWidth * 0.8;
  const videoFrameWidth = screenHeight * 0.9;
  const videoFrameHeight = (+videoFrameWidth * 9) / 16;
 
  useEffect(() => {

    fetch(
      Platform.OS === "android"
        ? "https://us-central1-kslstaging.cloudfunctions.net/api/v1/contents/configs/"
        : "https://us-central1-kslstaging.cloudfunctions.net/api/v1/contents/configs/"
    )
      .then((response) => response.json())
      .then((json) => {
        setSoure(json.soldoutImage);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ScrollView>
      <View style={[styles.container]}>
        <View>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.facebook.com/kongsalakofficial")
            }
          >
            <Image
              source={{ uri: source }}
              style={{
                height: pictureFrame,
                width: pictureFrame,
                borderRadius: 7,
                margin: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            {
              height: pictureFrame,
              width: videoFrameWidth,
              backgroundColor: "green",
            },
          ]}
        >
          <WebView
            source={{
              uri:
                "https://www.youtube.com/embed/SaaLEyoBxOo?autoplay=1&mute=1",
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
