import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomText, CustomTextBold } from "../../../components/CustomText";
import BlueBox from "../../../components/BlueBox";
import Searchs from "../../../components/SearchButton";
import { getRoundDateString } from "../../../helpers/helpers";
import RNPickerSelect from "react-native-picker-select";

function homeSale({ webConfig, navigation }) {
  const [number, setNumber] = useState("");
  const [threeDigitsSearchType, setThreeDigitsSearchType] =
    useState("last-three");

  const search = () => {
    let url = "";
    let query = "";
    //if --> detail2; else --> detail1
    if (number.length === 2) {
      // url = `/lotteries/carts/last-two/${number}`;
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: "last-two",
        queryAmount: 5,
      });
    } else if (number.length === 3) {
      // url = `/lotteries/carts/${threeDigitsSearchType}/${number}`;
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: threeDigitsSearchType,
        queryAmount: 5,
      });
    } else if (number.length === 6) {
      // url = `/lotteries/carts/series/${number}`;
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: "series",
        queryAmount: 5,
      });
    } else {
      url = `/lotteries`;
      query = number ? { q: number } : {};
      navigation.navigate("searchLotteries", {
        url: url,
        query: query,
        navigation: navigation,
      });
    }
  };
  return (
    <View styles={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={{ margin: 8 }} />
        <CustomTextBold style={{ fontSize: 18, color: "#0b2760" }}>
          ลอตเตอรี่ออนไลน์ ซื้อเองง่าย จ่ายโดยรัฐบาล
        </CustomTextBold>
        <CustomTextBold style={{ fontSize: 18, color: "#0092d2", margin: 3 }}>
          ราคา 80 บาท ไม่มีค่าบริการ
        </CustomTextBold>
        <CustomText
          style={{ fontSize: 16, color: "#0b2760", fontWeight: "200" }}
        >
          {getRoundDateString(webConfig.roundDate)}
        </CustomText>
        <View style={{ margin: 8 }} />

        <BlueBox style={{ padding: 5, margin: 10 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ margin: 5 }} />
            <CustomTextBold style={{ fontSize: 28, color: "#fff" }}>
              ค้นหาเลขเด็ด!
            </CustomTextBold>
            <View style={{ margin: 5 }} />
            <CustomText style={{ fontSize: 18, color: "#fff" }}>
              ค้นได้ทั้งเลขหน้า เลขท้าย หรือทั้งหมด
            </CustomText>
            <View style={{ margin: 10 }} />
            <View style={{ width: "100%" }}>
              <Searchs
                onPress={() => search()}
                value={number}
                onChange={(value) => setNumber(value)}
              />
              {number.length === 3 && (
                <View
                  style={{
                    marginTop: 1,
                    width: "39%",
                    position: "absolute",
                    left: 139,
                  }}
                >
                  <RNPickerSelect
                    placeholder={{}}
                    onValueChange={(value) => setThreeDigitsSearchType(value)}
                    items={[
                      { label: "สามตัวท้าย", value: "last-three" },
                      { label: "สามตัวหน้า", value: "first-three" },
                    ]}
                    style={{ padding: 20 }}
                  />
                </View>
              )}
            </View>
            <View style={{ margin: 10 }} />
          </View>
        </BlueBox>
      </View>
      {/* box */}
      <View style={{ margin: 5 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 100,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});

export default homeSale;
