import React, { useState, useEffect,useContext, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { CustomText, CustomTextBold } from "../../components/CustomText";
import BlueBlock from "../../components/BlueBox";
import { reduce, map, groupBy, stubArray } from "lodash";
import { formatComma } from "../../helpers/helperDateFormat";
import GoldBox from "../../components/GoldBox";
import RNPickerSelect from "react-native-picker-select";
import * as Font from "expo-font";
import GoldGradient from "../../components/GoldGradient";
import GreyGradient from "../../components/GreyGradient";
import DarkGoldGradient from "../../components/DarkGoldGradient";
import callApi from "../../assets/api/callApi";
import * as SecureStore from "expo-secure-store";
import Lotteries from "../../components/Lotteries";

export default function requestPrize({ roundDate = "01 มกราคม 2563", prizes }) {
  // const [prizes, setPrizes] = useState();
  const [colorInput, setColorInput] = useState(false);
  const blur = () => setColorInput(false);
  const onFocus = () => setColorInput(true);
  
  const [accountName, setAccountName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [requestAwardType, setRequestAwardType] = useState("bank");
  const [bankName, setbankName] = useState();
  const [bankAccount, setBankAccount] = useState();
  const [bankAccountName, setBankAccountName] = useState('');
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  let isRequestAward = false


  bankAccount && bankAccountName && bankName

  const sumPrize = reduce(
    prizes,
    (result, prize, prizeName) => {
      const firstPrize = prize[0];
      return result + prize.length * firstPrize.value;
    },
    0
  );




  // const fetchPrizes = async () => {
  //   try {
  //     const _prizes = await fetch(
  //       "https://us-central1-kslstaging.cloudfunctions.net11/api/v1/users/me/prizes"
  //     );
  //     if (_prizes) {
  //       const prizeGroupByType = groupBy(_prizes.json(), "name");
  //       setPrizes(prizeGroupByType);
  //       setPrizeCount(_prizes.results.length);
  //     }
  //   } catch (err) {
  //     setIsEmptyPrize(true);
  //     setPrizeCount(0);
  //     console.log(err);
  //   }
  // };

  // const fetchShowResult = async () => {
  //   try {
  //     const _showResult = await callApi({
  //       url: "/contents/show-result",
  //     });
  //     if (_showResult) {
  //       setShowResult(_showResult.value);
  //     }
  //   } catch (err) {
  //     setIsEmptyPrize(true);
  //     setPrizeCount(0);
  //     console.log(err);
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const value = await SecureStore.getItemAsync("accessToken");
  //     // console.log("112",value);
  //     console.log("token from getdata",value)
  //     if (value !== null) {
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  useEffect(() => {
    // let prizeGroupByType = groupBy(prizeMockup.results, "name");
    // setPrizes(prizeGroupByType);
    // getData();
  }, []);



  const onRequestAward = async () => {
    try {
      const body = {};
      if (requestAwardType === 'bank') {
        if (bankAccount && bankAccountName && bankName) {
          body.type = requestAwardType;
          body.bankAccount = bankAccount;
          body.bankName = bankName;
          body.bankAccountName = bankAccountName;
        } else {
          Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
          return;
        }
      } else if (requestAwardType === 'postal') {
        if (name && address) {
          body.type = requestAwardType;
          body.name = name;
          body.address = address;
        } else {
          alert('กรุณากรอกข้อมูลให้ครบถ้วน');
          return;
        }
      }

      // dispatch(showLoading());
      await callApi({
        url: '/prizes/request-award',
        method: 'post',
        body: body,
      });

      await fetchPrizes();
      // dispatch(hideLoading());
    } catch (err) {
      alert('มีข้อผิดพลาดกรุณาติดต่อทีมงาน');
    }
  };


  return (
    <ScrollView>
      <View style={[styles.container]}>
        <BlueBlock style={styles.blueBlockContainer}>
          <View style={{ alignItems: "center" }}>
            <CustomTextBold style={styles.textTitle}>
              ผลการตรวจรางวัล
            </CustomTextBold>
            <CustomText style={styles.text}>งวดวันที่ {roundDate}</CustomText>
          </View>
          {map(prizes, (prize, prizeName) => {
            const firstPrize = prize[0];
            let prizeLabel = prize[0].label;
            isRequestAward = firstPrize.isRequestAward;
            const prizeValue =
              (prize.length * firstPrize.value) / 1000000 >= 1
                ? (prize.length * firstPrize.value) / 1000000
                : prize.length * firstPrize.value;
            return (
              <View key={prizeName} style={{ alignItems: "center" }}>
                <View style={styles.containTextPrize}>
                  <CustomText style={styles.textTitle}>
                    คุณถูก {prize[0].label} {prize.length}ใบ!
                  </CustomText>
                  <CustomText style={styles.text}>
                    เงินรางวัลรวม {formatComma(prizeValue)}{" "}
                    {(prize.length * firstPrize.valuee) / 1000000 >= 1
                      ? "ล้านบาท"
                      : "บาท"}
                  </CustomText>
                </View>
                <Lotteries
                  showAll
                  prize={true}
                  lotteries={prize.map((singlePrize) => {
                    const newPrize = {
                      image: singlePrize.lotteryImage,
                      number: singlePrize.lotteryNumber,
                    };
                    switch (singlePrize.name) {
                      case "first3Digits":
                        newPrize.firstThreeDigits = singlePrize.prizeNumber;
                        break;
                      case "last3Digits":
                        newPrize.lastThreeDigits = singlePrize.prizeNumber;
                        break;
                      case "last2Digits":
                        newPrize.lastTwoDigits = singlePrize.prizeNumber;
                        break;
                      default:
                        break;
                    }
                    return newPrize;
                  })}
                  imageSize={0.85}
                ></Lotteries>
              </View>
            );
          })}
          <View style={{ margin: 5 }}></View>
          <DarkGoldGradient style={styles.darkGoldBox}>
            <CustomText>
              รวมเป็นเงินทั้งหมดที่ได้รางวัล:{formatComma(sumPrize)} บาท
            </CustomText>
          </DarkGoldGradient>
          {/**--------------------------------- Form ---------------------------------**/}

          <View style={styles.formContainer}>
            {/* <View style={{ width: "100%" }}>
              <CustomText style={styles.text}>
                เลือกช่องทางการรับรางวัล
              </CustomText>
             </View>
             <View
              style={[
                { width: "100%", backgroundColor: "#ffff", borderRadius: 4 },
              ]}
             >
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) => setRequestAwardType(value)}
                items={[
                  {
                    label:
                      Platform.OS === "ios"
                        ? "โอนเงินเข้าบัญชีธนาคาร                                   ▾"
                        : "โอนเงินเข้าบัญชีธนาคาร",
                    value: "bank",
                  },
                  {
                    label:
                      Platform.OS === "ios"
                        ? "รับลอตเตอรี่ทางไปษณีย์                                   ▾"
                        : "รับลอตเตอรี่ทางไปษณีย์",
                    value: "รับลอตเตอรี่ทางไปษณีย์",
                  },
                ]}
                useNativeAndroidPickerStyle={false}
                style={{
                  ...pickerSelectStyles,
                  placeholder: {
                    color: "black",
                  },
                }}
              />
            </View> */}

            {requestAwardType === "bank" && !isRequestAward && (
              
              <View style={styles.containBankPiger}>
                <View style={{ width: "48%" }}>
                  <CustomText style={styles.text}>ธนาคารที่รับเงิน</CustomText>
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
                        setbankName(value);
                      }}
                      useNativeAndroidPickerStyle={false}
                      style={{
                        ...pickerSelectStyles,
                        placeholder: {
                          color: "black",
                        },
                      }}
                      items={[
                        { label: "กสิกรไทย", value: "BBL" },
                        { label: "กรุงเทพ", value: "KBANK" },
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
                          label:
                            "พัฒนาวิสาหกิจขนาดกลางและขนาดย่อมแห่งประเทศไทย",
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
                </View>
                <View style={{ width: "48%" }}>
                  <CustomText style={styles.text}>เลขที่บัญชี</CustomText>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        borderColor: colorInput ? "#FFB800CC" : "#FFFFFF",
                        borderWidth: colorInput ? 2 : 0,
                      },
                    ]}
                    onChangeText={(text) => setBankAccount(text)}
                    keyboardType="number-pad"
                    placeholder="กรอกเลขที่บัญชี"
                    onFocus={onFocus}
                    maxLength={17}
                    onBlur={blur}
                    value={bankAccount}
                  />
                </View>
                <View style={{ width: "100%" }}>
              <CustomText style={styles.text}>ชื่อบัญชี</CustomText>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: colorInput ? "#FFB800CC" : "#FFFFFF",
                    borderWidth: colorInput ? 2 : 0,
                  },
                ]}
                onChangeText={(text) => setBankAccountName(text)}
                keyboardType="default"
                placeholder="กรอกชื่อบัญชี"
                onFocus={onFocus}
                maxLength={17}
                onBlur={blur}
                value={accountName}
              />

              <TouchableOpacity onPress={onRequestAward}>
                <View style={{ width: "100%" }}>
                  <GoldGradient style={styles.goldGradient}>
                    <CustomText style={{ color: "black" }}>
                      ยืนยันการรับเงินรางวัล
                    </CustomText>
                  </GoldGradient>
                </View>
              </TouchableOpacity>
            </View>
              </View>
            )}
            
          </View>
        </BlueBlock>
        <View style={{ margin: 10 }}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f7",
  },
  blueBlockContainer: {
    paddingVertical: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    margin: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containTextPrize: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginBottom: 15,
  },
  containBankPiger: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    justifyContent: "space-between",
  },
  darkGoldBox: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ffff",
  },
  textTitle: {
    fontSize: 20,
    margin: 3,
    marginTop: 0,
    color: "#ffff",
  },
  Datail: {
    fontSize: 16,
    marginTop: 6,
    color: "#000",
  },
  goldGradient: {
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#fff",
  },
  Image: {
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ffff",
    alignItems: "center",
  },
  pikerSelect: {
    width: "80%",
    backgroundColor: "#ffff",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
  textInput: {
    padding: 3,
    width: "100%",
    height: 35,
    fontSize: 15,
    borderRadius: 3,
    backgroundColor: "#ffff",
  },
});

/* STYLE of PICKER SELECT DROPDOWN */
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingLeft: 12,
    fontSize: 16,
    color: "black",
    width: "100%",
    height: 35,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    fontFamily: "Anuphan-Regular",
  },
  inputAndroid: {
    paddingLeft: 12,
    fontSize: 16,
    height: 25,
    width: "100%",
    height: 35,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    borderColor: "grey",
    borderWidth: 1,
    fontFamily: "Anuphan-Regular",
  },
});