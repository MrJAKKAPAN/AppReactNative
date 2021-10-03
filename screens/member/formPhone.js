import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from "react-native";
import callApi from "../../assets/api/callApi";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { CustomText, CustomTextBold } from "../../components/CustomText"
import GreyGradient from "../../components/GreyGradient"

function FromPhone(props) {
  const {
    phone,
    setPhone,
    setShowFormPhone,
    setShowFormLine,
    setShowFormOtp,
    countdownToShowSendOtpAgain,
  } = props;

  const context = useContext(AppStateContext);

  const sendPhone = () => {
    callApi({
      url: "/users",
      body: { phone },
    });
    setShowFormPhone(false);
    setShowFormOtp(true);
  };

  const clickLine = () => {
    setShowFormPhone(false);
    setShowFormLine(true);
  };
  return (
    <View style={{ marginLeft: 10, marginRight: 10,justifyContent:"center",}}>
      <CustomTextBold style={styles.pageTitle}>ข้อมูลสมาชิก</CustomTextBold>
      <View style={styles.main}>
        <CustomTextBold style={styles.header}>กรอกเบอร์มือถือ</CustomTextBold>
        <CustomText style={styles.textTop}>
          ระบบจะส่งรหัสเข้าตู้เซฟของสมาชิกไปให้
        </CustomText>
        <TextInput
          style={styles.input}
          placeholder="กรอกเบอร์มือถือของคุณ"
          onChangeText={(n) => setPhone(n)}
          keyboardType="phone-pad"
          maxLength={10}
        />

        {phone.length !== 10 ? (
          <TouchableOpacity >
            <GreyGradient disabled style={styles.buttonDisabled}>
              <CustomText>ขอรหัส</CustomText>
            </GreyGradient>

          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              let num = phone.replace(".", "");
              if (isNaN(num)) {
                Alert.alert("กรุณากรอกเฉพาะเบอร์โทร");
              } else {
                sendPhone();
                countdownToShowSendOtpAgain();
              }
            }}
            style={styles.button}
          >
            <CustomText>ขอรหัส</CustomText>
          </TouchableOpacity>
        )}
        <CustomText style={styles.textBottom}>
          หากยังไม่เคยสมัคร เราจะเปิดตู้เซฟใหม่ให้คุณ
        </CustomText>
        <CustomText style={styles.textBottom}>หรือ</CustomText>

        <TouchableOpacity
          style={{ alignItems: "center", marginBottom: 20 }}
          onPress={() => {
            clickLine();
          }}
        >
          <Image source={require("../../assets/images/btn_login_base.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FromPhone;
const styles = StyleSheet.create({
  pageTitle: {
    color: "black",
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
    width: "100%",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Anuphan-Regular",
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
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 5,
  },
  textBottom: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
});
