import React from "react";
import { View, Text } from "react-native";
import BlueBox from '../components/BlueBox'
import Searchs from '../components/SearchButton'
import {CustomText,CustomTextBold} from './CustomText'

export default function SeachBlueBox() {
  return (
    <View>
      <BlueBox style={{ padding: 5, margin: 10 }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ margin: 5 }} />
          <CustomTextBold style={{ fontSize: 28, color: "#fff" }}>
            ค้นหาเลขเด็ด!
          </CustomTextBold>
          <View style={{ margin: 2 }} />
          <CustomText style={{ fontSize: 18, color: "#fff" }}>
            ค้นได้ทั้งเลขหน้า เลขท้าย หรือทั้งหมด
          </CustomText>
          <View style={{ margin: 10 }} />
          <Searchs />
          <View style={{ margin: 10 }} />
        </View>
      </BlueBox>
    </View>
  );
}
