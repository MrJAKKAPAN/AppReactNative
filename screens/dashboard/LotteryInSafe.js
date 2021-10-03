import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import BlogLottery from "./blogLottery";
import Btns from "../../components/ButtonGray";
import BlueBlock from "../../components/BlueBox";
import * as SecureStore from 'expo-secure-store';
import CustomText from '../../components/CustomText'

function Dashboard({ navigation }) {
  const [status, setStatus] = useState(0);
  const [isAward,setIsAward] = useState(false)



  let d = new Date();
  let n = d.getTime() / 1000;
  useEffect(() => {
    checkAuth();
  });

  const checkAuth = async () => {
    let token = await SecureStore.getItemAsync("accessToken");   // if (!token) {
    //   console.log("CCCCCCCC");
    //   navigation.navigate("สมาชิก");   // ปิดเพื่อให้โชว์ ตู้เซฟ
    // }
  };

  ///// **** Exsample Arr **** /////
  // const series = () => Arr.series.lenght
  // const twoDigits = () => Arr.twoDigits.lenght
  // const threeDigits = () => Arr.threeDigits.lenght
  // const firstThreeDigits = () => Arr.firstThreeDigits.lenght

  const checkTitle =
    status === 0
      ? "คุณยังไม่ได้ซื้อลอตเตอรี่"
      : status === 1
      ? "ลอตเตอรี่ที่ซื้อแล้ว เก็บในตู้เซฟ"
      : status === 2
      ? "ลอตเตอรี่ที่รอโอนเงิน"
      : status === 4
      ? "ลอตเตอรี่ที่แจ้งโอนแล้ว"
      : "";

  const checkDetailDate =
    status === 2 && 4
      ? "1 ใบ 80 บาท"
      : status === 1
      ? "งวดวันที่ 1 เมษายน 2564"
      : "";

  const checkdetailText =
    status === 0
      ? "ระบบจะพาไปหน้าแรก ภายใน 30 วินาที"
      : status === 2
      ? "ต้องโอนและแจ้งภายใน 30 นาทีที่ซื้อ"
      : status === 4
      ? "รอยืนยันจากทีมกองสลาก"
      : "";

  const images = [
    {
      id: 1,
      image:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
    {
      id: 2,
      image:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/01-01-64/63/01/04/095186.jpg",
    },
    {
      id: 3,
      image:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/640839.jpg",
    },
    {
      id: 4,
      image:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
  ];


  

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Title}>
          ตู้เซฟคุณ : Jakakpan Sitthikan
        </Text>
        <Text style={styles.Datail}>
          <Icon name="star" containerStyle="8" />
          รหัสสมาชิก : 2004
        </Text>
        <Text style={styles.Datail}>
          <Icon name="phone" style={{ fontSize: 10 }} />
          โทร : 0863396240
        </Text>
        <View style={{ margin: 5 }} />
        <BlueBlock>
          <View style={{ margin: 5 }} />

          {/* ///// START สถานะ หวยใน ตู้เซฟฟ  ///// */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              คุณยังไม่ได้ซื้อลอตเตอรี่
            </Text>
            <View style={{ margin: 5 }} />
            <Text style={styles.Txt}>
              ลอตเตอรี่ที่ซื้อแล้ว เก็บในตู้เซฟ
            </Text>
            <View style={{ margin: 5 }} />
            <Text style={styles.Txt}>
              ระบบจะพาไปหน้าแรก ภายใน 30 วินาที
            </Text>
            <View style={{ margin: 5 }} />
          </View>
          {/* ///// END สถานะ หวยใน ตู้เซฟฟ  ///// */}

          <BlogLottery
            images={images}
            positionText="เลขท้าย"
            positionNumber="91"
            amountText="จำนวน"
            amountNumber="15"
            blade="ใบ"
            // onPressConfriment={}
          />
        </BlueBlock>
        <View style={{ margin: 12 }} />
        <Btns text="ออกจากระบบ" />




      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f7",
  },
  Title: {
    fontSize: 24,
    marginTop: 8,
    color: "#000",
    fontWeight: "bold",
  },
  Datail: {
    fontSize: 16,
    marginTop: 6,
    color: "#000",
  },
  Txt: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Dashboard;
