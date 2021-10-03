import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import callApi from "../../assets/api/callApi";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { CustomText, CustomTextBold} from "../../components/CustomText"

function FormName(props) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    isOver20,
    setIsOver20,
  } = props;
  const context = useContext(AppStateContext);

  const updateUser = async () => {
    await callApi({
      url: "/users/me",
      method: "put",
      body: { firstName, lastName },
    });
    const me = await callApi({ url: "/users/me" });
    context.setMe(me);
  };

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <CustomText style={styles.pageTitle}>ข้อมูลสมาชิก</CustomText>
      <View style={styles.main}>
        <CustomText style={styles.header}>ลงทะเบียนตู้เซฟ</CustomText>
        <CustomText style={styles.textTop}>กรอกข้อมูลเพื่อยืนยันความเป็นเจ้าของ</CustomText>
        <TextInput
          style={styles.inputFirstName}
          placeholder="ชื่อ"
          onChangeText={(v) => setFirstName(v)}
          keyboardType="default"
        />
        <TextInput
          style={styles.inputLastName}
          placeholder="นาสกุล"
          onChangeText={(v) => setLastName(v)}
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsOver20(!isOver20)}
        >
          <View style={styles.checkbox}>
            {isOver20 ? (
              <Text style={styles.checkboxText}>&#10003;</Text>
            ) : (
              <Text></Text>
            )}
          </View>
          <CustomText style={styles.checkboxText}>
            ขอยืนยันว่าเป็นผู้มีอายุ 20 ปีขึ้นไป
          </CustomText>
        </TouchableOpacity>
        {!firstName.trim() || !lastName.trim() || !isOver20 ? (
          <TouchableOpacity disabled style={styles.buttonDisabled}>
            <CustomText>ลงทะเบียน</CustomText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={updateUser} style={styles.button}>
            <CustomText>ลงทะเบียน</CustomText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default FormName;
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    resizeMode: "stretch",
    marginRight: 5,
    borderColor: "#fff",
    borderWidth: 1,
    paddingLeft: 3,
  },
  checkboxText: {
    color: "#fff",
  },

  inputFirstName: {
    height: 40,
    marginTop: 10,
    marginBottom: 3,
    borderWidth: 1,
    width: "auto",
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  inputLastName: {
    height: 40,
    marginTop: 10,
    marginBottom: 12,
    borderWidth: 1,
    width: "auto",
    paddingLeft: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
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
});
