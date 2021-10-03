////////  game ---> แก้ layout เอา marginTop ของแต่ละ image ออกทั้ง และแก้ css ทั้งหมด และเพิ่ม SafeAreaView ทั้ง 2 Platform และ reviewCode ( 26-4-64  14:50 น. ) ////////

import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import logoKSL from "../assets/images/logo.js";

const supportedURL =
  "https://www.trustmarkthai.com/callbackData/popup.php?data=0-15-5-c117cb9f4eaae166184ddabee068a5db2964b09be5a2&markID=firstmar";

const facebookURL = "https://www.facebook.com/kongsalakofficial";

function Header() {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View>
        <View style={styles.header}>
          <View style={styles.fixToOne}>
            <SvgXml xml={logoKSL} height="100%" style={{ marginTop: 5 }} />
            <View style={styles.fixToTwe}>
              <TouchableOpacity onPress={() => Linking.openURL(supportedURL)}>
                <Image
                  source={require("../assets/images/dbd.png")}
                  style={styles.pngDBD} 
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(facebookURL)}>
                <FontAwesome5
                  style={styles.facebook}
                  name="facebook"
                  size={30}
                  color="#0a7cff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  header: {
    padding: 10,
    borderBottomWidth: 3,
    backgroundColor: "#fff",
    borderBottomColor: "#62ccf5",
  },
  pngDBD: {
    width: 78,
    height: 30,
    padding: 15,
    marginEnd: 10,
  },
  fixToOne: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fixToTwe: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  facebook: {
    padding: 5,
    marginTop: -5,
    backgroundColor: "#fff",
  },
});
export default Header;
