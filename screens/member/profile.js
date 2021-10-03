import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import starSvg from "../../assets/images/star.js";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { CustomText, CustomTextBold } from "../../components/CustomText";
import GoldGradient from "../../components/GoldGradient";
import GreyGradient from "../../components/GreyGradient";

// fontSize
const youName = 22;
const dataMember = 16;

function Profile(props) {
  const { setShowFormPhone, navigation } = props;
  const context = useContext(AppStateContext);

  const removeToken = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    context.setToken(null);
    context.setMe("");
    setShowFormPhone(true);
    navigation.navigate("หน้าหลัก");
  };

  return (
    <View
      style={{
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.main}>
        <CustomText style={styles.header}>
          คุณ {context.me.firstName}
          {"   "}
          {context.me.lastName}
        </CustomText>
        <View style={{ alignItems: "center" }}>
          <CustomText style={styles.textStar}>
            <SvgXml xml={starSvg} />
            {/* <FontAwesome name="star" size={20} color="white" /> */}
            รหัสสมาชิก: {context.me.userId}
          </CustomText>
          {context.me.phone ||
            (context.me.phoneContact && (
              <CustomText style={styles.textPhone}>
                <Feather name="phone" style={styles.iconPhone} />
                โทร:{" "}
                {context.me.phone ? context.me.phone : context.me.phoneContact}
              </CustomText>
            ))}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ตู้เซฟสมาชิก")}>
          <GoldGradient style={styles.button}>
            <CustomText style={{ color: "#473707" }}>
              เข้าสู่ตู้เซฟสมาชิก
            </CustomText>
          </GoldGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeToken()}>
        <GreyGradient style={styles.buttonGrey}>
          <CustomText style={{ color: "#071737" }}>ออกจากระบบ</CustomText>
        </GreyGradient>
      </TouchableOpacity>
    </View>
  );
}
export default Profile;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    backgroundColor: "#0092d2",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    borderRadius: 5,
  },
  header: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textStar: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 5,
  },
  iconStar: {},
  textPhone: {
    color: "#fff",
    marginBottom: 15,
  },
  iconPhone: {
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    padding: 10,
    width: "100%",
    height: 45,
    marginBottom: 12,
    borderRadius: 5,
  },
  buttonGrey: {
    alignItems: "center",
    width: "60%",
    padding: 10,
    marginTop: 20,
    marginBottom: 12,
    marginLeft: 100,
    marginRight: 100,
    borderRadius: 5,
  },
});
