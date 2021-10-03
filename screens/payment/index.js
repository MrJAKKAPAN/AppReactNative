import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { TabActions, useFocusEffect } from "@react-navigation/native";
import GoldGradient from "../../components/GoldGradient";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import callApi from "../../assets/api/callApi";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import RNPickerSelect from "react-native-picker-select";
import moment from "moment";

import { AppStateContext } from "../../contexts/AppStateProvider";
import LotteryImg from "../../components/Lotteries";
import Timer from "../../components/Time";
import TagHr from "../../components/TagHr";
import Btn from "../../components/BtnGrey";
import BoxGold from "../../components/GoldBox";
import UnderLine from "../../components/UnderLine";
import ChooseFile from "../../components/ChooseFile";

moment.locale("th");

const getDiffTime = (start, end) => {
  const diff = end.diff(start);
  const diffDuration = moment.duration(diff);

  return { minutes: diffDuration.minutes(), seconds: diffDuration.seconds() };
};

const getThaiDay = (momentObj) => {
  const _momentObj = moment(momentObj).add(543, "year");
  return `${momentObj.format("DD MMMM")} ${_momentObj.format("YYYY")}`;
};

export default function App({ navigation, route }) {
  const today = moment();
  const todayText = getThaiDay(today);
  const yesterday = moment().subtract(1, "day");
  const yesterdatText = getThaiDay(yesterday);

  const [me, setMe] = useState();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [dataParamas, setDataParamas] = useState(null);

  const [image, setImage] = useState(null);
  const [initTime, setInitTime] = useState();
  const [paymentInfo, setPaymentInfo] = useState({});

  const [bankName, setBankName] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("java");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  const [selectedTimeHour, setSelectedTimeHour] = useState();
  const [selectedTimeMinute, setSelectedTimeMinute] = useState();
  const [selectedDate, setSelectedDate] = useState(today.format("DD/MM/YYYY"));

  const jumpToHome = TabActions.jumpTo("หน้าหลัก");
  const jumpToMember = TabActions.jumpTo("สมาชิก");
  const jumpToDashBoard = TabActions.jumpTo("ตู้เซฟสมาชิก");

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const lotteryWidth = screenWidth * 0.47;

  const context = useContext(AppStateContext);

  useFocusEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (route.params.orderId) {
      let dataParamas = route.params.orderId;
      setDataParamas(dataParamas);
    } else {
      navigation.navigate("ตระกร้า");
    }
  });

  useEffect(() => {
    fetchOrder();
    fetchOrders();
  }, [dataParamas]);

  useEffect(() => {
    async function getMe() {
      let resultMe = await SecureStore.getItemAsync("accessToken");
      if (resultMe) {
        setMe(resultMe);
      }
    }
    getMe();
  }, []);

  useEffect(() => {
    if (me) {
      setBankName(me.ownerBankName || "");
      setBankAccount(me.ownerBankNo || "");
    }
  }, [me]);

  useEffect(() => {
    let isMounded = true;
    if (isMounded) {
    }
  });

  const fetchOrders = async () => {
    try {
      const _orders = await callApi({
        url: "/users/me/orders",
      });
      if (_orders.results.length > 0) {
        setOrders(_orders.results);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrder = async () => {
    try {
      const _order = await callApi({
        url: `/orders/${route.params.orderId}`,
      });

      if (_order) {
        setOrder(_order);
        if (_order.status === "pending" && _order.totalPrice === 0) {
          callApi({
            url: `/orders/${route.params.orderId}/exchange-credit`,
            method: "post",
          });
          navigation.dispatch(jumpToMember);
        }

        const time = getDiffTime(moment(), moment(_order.expiredAt));
        setInitTime(time);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let UrlBase64 = result.base64;
      setImage(result.uri);
      setPaymentInfo(UrlBase64);
    }
  };

  const submitPayment = async () => {
    if (!selectedTimeHour || !selectedTimeMinute)
      return alert("โปรดกรอกเวลาที่โอนเงิน");
    if (!paymentInfo) return alert("โปรดเพิ่มไฟล์แนบ");
    const date = moment(
      `${selectedDate}${selectedTimeHour}:${selectedTimeMinute}`,
      "DD/MM/YYYY HH:mm"
    );
    try {
      let dataResult = {
        evidence: paymentInfo,
        transferDate: date.toDate(),
        bankName: bankName,
        bankNo: bankAccount,
      };
      alert("ระบบกำลังดำเนินการ กรุณารอสักคู่");
      await axios
        .post(
          `https://us-central1-kslstaging.cloudfunctions.net/api/v1/orders/${dataParamas}/inform-payment`,
          dataResult,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              accessToken: me,
            },
          }
        )
        .then((response) => response.message)
        .then(() =>
          alert("ยืนยันการชำระเงิน....ตรวจสอบสถานะได้ที่ ตู้เซฟสมาชิก")
        );
      setTimeout(() => {
        navigation.dispatch(jumpToDashBoard);
      }, 2000);
    } catch (err) {
      const errors = get(err, "reason.errors.errors");
      console.log("errors...catch", err);
      if (errors) {
        const errorMsg = errors.reduce((result, error) => {
          return `${result}${error.msg}\n`;
        }, "");
        alert(errorMsg);
      }
    }
  };

  const cancelOrder = async () => {
    setIsLoading(true);
    setLoading(true);
    try {
      await callApi({
        url: `/orders/${dataParamas}/cancel`,
        body: paymentInfo,
      });
      // setIsLoading(false);
      route.params.orderId = "";
      navigation.dispatch(jumpToHome);
      // setLoading(true);
    } catch (error) {
      // setIsLoading(false);
    }
  };
  const goSave = () => {
    navigation.navigate("ตู้เซฟสมาชิก");
  };

  const validateSeletedHour = (hour) => {
    let h = parseInt(hour || 0);
    if (h < 0 || h > 23) hour = selectedTimeHour;

    setSelectedTimeHour(hour);
  };

  const validateTimeMinute = (minute) => {
    let h = parseInt(minute || 0);
    if (h < 0 || h > 59) minute = selectedTimeMinute;

    setSelectedTimeMinute(minute);
  };

  const onSubmitPhoneNumber = async () => {
    if (phoneNumber.length === 10) {
      const result = await callApi({
        url: "/users/requestOtpToVerify",
        body: {
          phone: phoneNumber,
        },
      });
      if (result.message === "success") {
        setShowOtpBox(true);
      }
    } else {
      alert("กรุณากรอกเบอร์ติดต่อให้ถูกต้อง");
    }
  };

  const onSubmitOTP = async () => {
    try {
      const result = await callApi({
        url: "/users/verifyPhoneOtp",
        body: {
          phone: phoneNumber,
          otp: otp,
        },
      });
      if (result.user) {
        setSuccessVerifyOtp(true);
        setShowOtpBox(false);
        alert("ยืนยันเบอร์โทรศัพท์เรียบร้อย");
        let me = { ...context.me };
        me.phone = phoneNumber;
        context.setMe(me);
      }
    } catch (err) {
      console.log(err);
      alert("รหัส OTP ไม่ถูกต้อง!");
    }
  };

  if (!order) {
    return <View></View>;
  }

  return (
    <>
      {order ? (
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.container}>
            <UnderLine margin={8} />
            <Text style={styles.Title}>ตระกร้าใส่ลอตเตอรี่</Text>
            <UnderLine margin={3} />
            <BoxGold>
              <LotteryImg lotteries={order.items} />

              <UnderLine margin={18} />

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}
                >
                  ลอตเตอรี่
                  {order ? <Text> {order.items.length} ใบ </Text> : ""}
                </Text>
                <View style={styles.BlogTextTitle}>
                  <View style={{ padding: 8, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {order ? <Text>{order.totalPrice} </Text> : ""}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}
                >
                  {" "}
                  บาท
                </Text>
              </View>
              <UnderLine margin={8} />
              <Text style={styles.TextColor}>กรุณาชำระและแจ้งโอนภายใน</Text>
              <UnderLine margin={5} />

              {order && initTime && (
                <Timer
                  initialMinute={initTime.minutes}
                  initialSeconds={initTime.seconds}
                  onExpired={() => {
                    setLoading(true);
                    cancelOrder();
                    alert(
                      "คำสั่งซื้อหมดอายุ เราได้ทำการยกเลิกคำสั่งซื้อนี้แล้ว"
                    );
                    navigation.dispatch(jumpToHome);
                  }}
                ></Timer>
              )}

              <View style={{ margin: 10 }} />
              <TagHr marginButtom={25} />
              <View style={{ width: "100%", padding: 8 }}>
                <UnderLine margin={5} />
                <Text style={[styles.TextColor, { fontSize: 20 }]}>
                  ตัวแทนจำหน่าย{" "}
                </Text>
                <UnderLine margin={5} />
                <Text style={styles.TextColor}>
                  {" "}
                  บัญชี:<Text>{"       "}บจก.ลอตเตอรี่ออนไลน์ </Text>
                </Text>
                <UnderLine margin={5} />
                <Text style={styles.TextColor}>
                  {" "}
                  ธนาคาร: <Text> ธ.กสิกร</Text>
                </Text>
                <UnderLine margin={5} />
                <Text style={styles.TextColor}>
                  {" "}
                  เลขที่:{" "}
                  <Text
                    style={{
                      fontSize: 24,
                      position: "absolute",
                      marginTop: 10,
                    }}
                  >
                    {"    "}
                    0893918116{" "}
                  </Text>
                </Text>
                <View style={{ margin: 10 }} />
              </View>
              <TagHr marginButtom={25} />
              <View
                style={{ width: "100%", flexDirection: "column", padding: 10 }}
              >
                <UnderLine margin={8} />
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.TextColor}> วันที่โอน </Text>
                    <UnderLine margin={5} />
                    <View style={styles.BlokSelect}>
                      <RNPickerSelect
                        placeholder={{}}
                        onValueChange={(value) => setSelectedDate(value)}
                        items={[
                          {
                            label: todayText,
                            value: today.format("DD/MM/YYYY"),
                          },
                          {
                            label: yesterdatText,
                            value: yesterday.format("DD/MM/YYYY"),
                          },
                        ]}
                        style={pickerSelectStyles}
                      />
                    </View>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.TextColor}> เวลาที่โอน </Text>
                    <UnderLine margin={5} />
                    <View style={{ width: "100%", flexDirection: "row" }}>
                      <TextInput
                        style={styles.InputTime}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={selectedTimeHour}
                        onChangeText={(value) => validateSeletedHour(value)}
                      />
                      <Text style={{ fontSize: 28, color: "#fff" }}> : </Text>
                      <TextInput
                        style={styles.InputTime}
                        keyboardType="number-pad"
                        maxLength={2}
                        value={selectedTimeMinute}
                        onChangeText={(value) => validateTimeMinute(value)}
                        validateSeletedTime
                      />
                      <Text
                        style={{ fontSize: 18, marginTop: 8, color: "#fff" }}
                      >
                        {" "}
                        น.{" "}
                      </Text>
                    </View>
                  </View>
                </View>

                <UnderLine margin={5} />

                <Text style={styles.TextColor}>เลือกธนาคาร</Text>

                <View style={{ backgroundColor: "#ffff", borderRadius: 4 }}>
                  <RNPickerSelect
                    placeholder={{
                      label:
                        Platform.OS === "ios"
                          ? "เลือกธนาคาร     ▾"
                          : "เลือกธนาคาร",
                      value: null,
                      color: "red",
                      fontFamily: "Anuphan-Regular",
                    }}
                    onValueChange={(value) => {
                      setBankName(value);
                    }}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      ...pickerSelectStyles,
                      placeholder: {
                        color: "black",
                      },
                    }}
                    items={[
                      { label: "กรุงเทพ", value: "BBL" },
                      { label: "กสิกรไทย", value: "KBANK" },
                      { label: "กรุงไทย", value: "KTB" },
                      { label: "ทหารไทย", value: "TMB" },
                      { label: "ไทยพาณิชย์", value: "SCB" },
                      { label: "กรุงศรีอยุธยา", value: "BAY" },
                      { label: "เกียรตินาคินภัทร", value: "KKP" },
                      { label: "ซีไอเอ็มบีไทย", value: "CIMBT" },
                      { label: "ทิสโก้", value: "TISCO" },
                      { label: "ธนชาต", value: "TBANK" },
                      { label: "ยูโอบี", value: "UOBT" },
                      { label: "ไทยเครดิตเพื่อรายย่อย", value: "TCD" },
                      { label: "แลนด์แอนด์", value: "LHFG" },
                      { label: "ไอซีบีซี", value: "ICBCT" },
                      {
                        label: "พัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย",
                        value: "SME",
                      },
                      {
                        label: "เพื่อการเกษตรและสหกรณ์การเกษตร",
                        value: "BAAC",
                      },
                      {
                        label: "เพื่อการส่งออกและนำเข้าแห่งประเทศไทย",
                        value: "EXIM",
                      },
                      { label: "ออมสิน", value: "GSB" },
                      { label: "อาคารสงเคราะห์", value: "GHB" },
                      { label: "อิสลามแห่งประเทศไทย", value: "ISBT" },
                    ]}
                  />
                </View>

                {/* วันที่โอน */}
                <UnderLine margin={8} />
                <Text style={styles.TextColor}> สลิปโอนเงิน </Text>
                <UnderLine margin={5} />
                <ChooseFile
                  text="Choose File"
                  onPress={() => pickImage()}
                  placeholder="No file choose"
                  plchoices={image ? image.split("-").slice(-1) : image}
                />
                <View style={{ margin: 10 }} />
                {!(context.me.phone || context.me.phoneContact) && (
                  <View>
                    <Text style={styles.TextColor}>เบอร์โทรติดต่อกลับ</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        style={{
                          backgroundColor: "#fff",
                          width: "50%",
                          height: 40,
                          marginRight: 10,
                          borderRadius: 5,
                        }}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={(val) => setPhoneNumber(val)}
                      />
                      <GoldGradient
                        style={[styles.btnGold, { height: lotteryWidth / 4.5 }]}
                        onPress={() => onSubmitPhoneNumber()}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#473707",
                          }}
                        >
                          ส่ง
                        </Text>
                      </GoldGradient>
                    </View>
                  </View>
                )}

                {showOtpBox && (
                  <View>
                    <Text style={styles.TextColor}>รหัสยืนยัน</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        style={{
                          backgroundColor: "#fff",
                          width: "50%",
                          height: 40,
                          marginRight: 10,
                          borderRadius: 5,
                        }}
                        keyboardType="phone-pad"
                        value={otp}
                        onChangeText={(val) => setOtp(val)}
                      />

                      <GoldGradient
                        style={[styles.btnGold, { height: lotteryWidth / 4.5 }]}
                        onPress={() => onSubmitOTP()}
                      >
                        <Text style={{ textAlign: "center", color: "#473707" }}>
                          ยืนยัน
                        </Text>
                      </GoldGradient>
                    </View>
                  </View>
                )}

                <View style={{ marginTop: 5, width: "100%" }}>
                  <Btn
                    onPress={() => submitPayment()}
                    text="ยืนยันการโอนเงิน"
                    color="#fbe599"
                    style={{ width: "100%" }}
                  />
                </View>
              </View>
            </BoxGold>
            <View style={{ margin: 10 }} />
            <Text>หรือ</Text>
            <View style={{ margin: 10 }} />
            <View style={{ marginBottom: 10 }}>
              <Btn
                onPress={() => cancelOrder()}
                text="ยกเลิกคำสั่งซื้อ"
                iconName="arrow-right"
                color="#c2c2c2"
                width={200}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={stylesSpin.container}>
          <Spinner
            visible={loading}
            textContent={"Loading"}
            textStyle={stylesSpin.spinnerTextStyle}
          />
        </View>
      )}
      {order.status === "confirmed" && (
        <View>
          <Text>แจ้งชำระเงินเรียบร้อย</Text>
          <View>
            <Text>ทีมงานกำลังตรวจสอบ</Text>
            <Text>สามารถดูสถานะลอตเตอรี่ได้ที่ตู้เซฟ</Text>
            <TouchableOpacity onPress={() => goSave()}>
              <Text>ไปที่ตู้เซฟ</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const stylesSpin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  spinnerTextStyle: {
    color: "#000",
  },
});

const styles = StyleSheet.create({
  btnGold: {
    width: "45%",
    borderRadius: 5,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#0b2760",
    fontWeight: "bold",
    alignItems: "center",
  },
  TextColor: {
    color: "#fff",
  },
  BlokSelect: {
    width: "90%",
    borderRadius: 3,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  InputTime: {
    padding: 8,
    height: 40,
    width: "30%",
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  BlogTextTitle: {
    marginTop: -5,
    marginEnd: 10,
    borderWidth: 2,
    marginStart: 10,
    borderRadius: 5,
    flexDirection: "row",
    borderColor: "#E5E5E5",
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    padding: 8,
    fontSize: 16,
    color: "black",
    borderRadius: 4,
    borderWidth: 0.5,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 40,
    margin: 9,
    padding: 8,
    fontSize: 16,
    color: "black",
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderWidth: 0.5,
    paddingVertical: 10,
    borderColor: "purple",
    paddingHorizontal: 12,
  },
});
