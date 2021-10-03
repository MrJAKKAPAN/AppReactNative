import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
} from "react-native";
import IconLinks from "../../components/IconLink";

const HeadIcon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapIconAndText}>
        <View style={{ justifyContent: "space-between" }}>
          {IconLinks.map((iconLink, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => Linking.openURL(iconLink.link)}
            >
              <Image style={styles.icon} source={iconLink.icon} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
          {IconLinks.map((iconLink, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => Linking.openURL(iconLink.link)}
            >
              <View>
                <Text style={styles.textContent}>{iconLink.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default HeadIcon;

const styles = StyleSheet.create({
  container: {
    height: 150,
  },
  wrapIconAndText: {
    height: "100%",
    flexDirection: "row",
  },
  icon: {
    width: 25,
    height: 25,
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  textContent: {
    color: "#ffff",
    fontFamily: "Anuphan-Regular",
    fontSize: 18,
  },
});
