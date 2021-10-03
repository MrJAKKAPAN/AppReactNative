import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeadIcon from "../../contact/HeadIcon";
import { CustomText, CustomTextBold } from "../../../components/CustomText";

export default function CloseRoundBox() {
  return (
    <View style={{ padding: 0 }}>
      <View style={styles.blueBox}>
        <CustomTextBold style={{ fontSize: 25 }}>
          ปิดทำการซื้อขาย
        </CustomTextBold>
        <View style={styles.textContain}>
          <CustomText>รอประกาศรางวัลจากกองสลาก เร็วๆ นี้</CustomText>
          <CustomText>สอบถามข้อมูลเพิ่มเติม ติดต่อ</CustomText>
        </View>
        <HeadIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blueBox: {
    borderRadius: 7,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0092d2",
  },
  textContain: {
    marginVertical: 15,
    alignItems: "center",
  },
});
