import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import callApi from "../../assets/api/callApi";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { CustomText, CustomTextBold} from "../../components/CustomText"
function FromOtp(props) {
  const {
    phone,
    otp,
    setOtp,
    setShowFormOtp,
    setShowSendOtpAgain,
    showSendOtpAgain,
    countdownToShowSendOtpAgain,
  } = props;

  const context = useContext(AppStateContext);

  const sendOtp = async () => {
    const result = await callApi({
      url: "/users/login",
      body: { phone: phone, otp: otp },
    });
    await SecureStore.setItemAsync("accessToken", result.accessToken);
    context.setToken(result.accessToken);
    const me = await callApi({ url: "/users/me" });
    context.setMe(me);
    setShowFormOtp(false);
    setShowSendOtpAgain(false);
  };

  const sendPhone = () => {
    callApi({
      url: "/users",
      body: { phone },
    });
  };

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <CustomTextBold style={styles.pageTitle}>ข้อมูลสมาชิก</CustomTextBold>
      <View style={styles.main}>
        <CustomText style={styles.header}>กรอกรหัสเข้าตู้เซฟ</CustomText>
        <CustomText style={styles.textTop}>ระบบได้ส่งข้อความไปที่เบอร์ {phone}</CustomText>
        <TextInput
          style={styles.input}
          placeholder="กรอกตัวเลข 6 หลัก"
          onChangeText={(n) => setOtp(n)}
          keyboardType="phone-pad"
          maxLength={6}
        />
        {otp.length !== 6 ? (
          <TouchableOpacity disabled style={styles.buttonDisabled}>
            <CustomText>เปิดตู้</CustomText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              let num = otp.replace(".", "");
              if (isNaN(num)) {
                Alert.alert("กรุณากรอกรหัส Otp เฉพาะตัวเลข");
              } else {
                sendOtp();
              }
            }}
            style={styles.button}
          >
            <CustomText>เปิดตู้เซฟ</CustomText>
          </TouchableOpacity>
        )}
        {showSendOtpAgain && (
          <View>
            <CustomText style={styles.textTop}>กรุณารอประมาณ 1 นาที</CustomText>
            <TouchableOpacity style={styles.buttonSendAgain}>
              <CustomText
                CustomonPress={() => {
                  sendPhone();
                  setShowSendOtpAgain(false);
                  countdownToShowSendOtpAgain();
                }}
              >
                คลิกที่นี่เพื่อส่งรหัสอีกครั้ง
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

export default FromOtp;

const styles = StyleSheet.create({
  pageTitle: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 15,
    marginTop: 8,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
    color: "#fff",
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textTop: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
  },
  main: {
    backgroundColor: "#0092d2",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fbe599",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  buttonDisabled: {
    alignItems: "center",
    backgroundColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  buttonSendAgain: {
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    padding: 10,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 5,
    marginBottom: 12,
    borderRadius: 5,
  },
});
