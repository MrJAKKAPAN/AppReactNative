import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// import callApi from "../../helpers/callApi";
import callApi from "../../assets/api/callApi";
import GoldBox from "../../components/GoldBox";
import SliderLottory from "../../components/SliderLottory";
import TextRows from "../../components/TextRow";
import Searchs from "../../components/SearchButton";
import { CustomTextBold } from "../../components/CustomText";
import { get, remove, take } from "lodash";
import RNPickerSelect from "react-native-picker-select";

const LOTTERY_PRICE = 80;

function Detail1(props) {
  const { url, query } = props.route.params;
  let queryType = url.split("/")[3];
  let lotteryType = queryType;

  const [amount, setAmount] = useState(5);
  const [selectedLotteries, setSelectedLotteries] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryCount, setLotteryCount] = useState(0);
  const [relatedLotteries, setRelatedLotteries] = useState([]);
  const [page, setPage] = useState(1);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const lotteryWidth = screenWidth * 0.47;

  let lotterGroup = "";
  let arr = [];

  useEffect(() => {
    fetchLottery();
    fetchRelatedLotteries();
  }, [url]);

  const fetchLottery = async () => {
    try {
      const response = await callApi({
        url: url,
      });

      if (response) {
        const lotteriesGroup = response.lotteries;

        const sumLotteriesCount = lotteriesGroup.reduce((result, lg) => {
          return result + lg.lotteries.length;
        }, 0);

        setLotteries(response.lotteries);
        setLotteryCount(sumLotteriesCount);
        const _amount = amount || 5;
        if (_amount > sumLotteriesCount) {
          setAmount(sumLotteriesCount);
        }

        const _selectedLotteries = response.lotteries.reduce(
          (result, lotteryGroup) => {
            if (result.length < _amount) {
              lotteryGroup.lotteries.forEach((lottery) => {
                result.push(lottery.id);
              });
            }
            if (result.length > _amount) {
              setAmount(result.length);
            }
            return result;
          },
          []
        );
        setSelectedLotteries(_selectedLotteries);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRelatedLotteries = async () => {
    let num = url.split("/")[4];

    try {
      const url =
        queryType === "series"
          ? `/lotteries/home`
          : `/lotteries/${num}/related?type=${queryType}`;
      const _lotteries = await callApi({
        url: url,
      });
      if (_lotteries) {
        switch (queryType) {
          case "last-two":
            // setRelatedKey("lastTwoDigits");
            setRelatedLotteries(_lotteries);
            break;
          case "last-three":
            // setRelatedKey("lastThreeDigits");
            setRelatedLotteries(_lotteries);
            break;
          case "first-three":
            // setRelatedKey("firstThreeDigits");
            setRelatedLotteries(_lotteries);
            break;
          case "series":
            // setRelatedKey("number");
            setRelatedLotteries(_lotteries.series);
            break;
          default:
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLotteryGroup = (lotteryGroup) => {
    setAmount(amount - get(lotteryGroup, "lotteries.length"));
    const newSelectedLotteries = [...selectedLotteries];
    lotteryGroup.lotteries.forEach((lottery) => {
      remove(newSelectedLotteries, (lotId) => lottery.id === lotId);
    });
    setSelectedLotteries(newSelectedLotteries);
  };

  const cn = (lotteryType) => {
    switch (lotteryType) {
      case "last-two":
        return styles.labelLastTwo;
      case "first-three":
        return styles.labelFirstThree;
      case "last-three":
        return styles.labelLastThree;
      case "series":
        return styles.labelSeries;
      default:
        break;
    }
  };

  /* คำนวณ marginTopให้เว้นข้างบนให้เห็นเลขแต่ล่ะแพลตฟอร์ม */
  const marginCalculate = (marginValue) => {
    return ((screenHeight / (screenHeight / screenWidth)) * marginValue) / 400;
  };

  const selectedItem = {
    title: "Selected item title",
    description: "Secondary long descriptive text ...",
  };

  const setLotteryGroup = () => {
    if (lotteryType === "first-three") lotterGroup = "firstThreeDigits";
    if (lotteryType === "last-three") lotterGroup = "lastThreeDigits";
    if (lotteryType === "last-two") lotterGroup = "lastTwoDigits";
  };
  if (lotteryType !== "series") {
    setLotteryGroup();
  }
  
  return (
    <View>
      {/* GoldBox */}
      <View style={styles.goldBox}>
        <SliderLottory
          images={lotteries}
          positionText="เลขท้าย"
          positionNumber="91"
          amountText="จำนวน"
          amountNumber={amount}
          blade="ใบ"
          bgColor="#FFB800"
          // onPressConfriment={}
        />
        {/* รายการ Lotteries */}
        <Text>พบลอตเตอรี่จำนวน {lotteryCount} ใบ</Text>
        <Text>เลือกลอตเตอรี่ {amount} ใบ</Text>
        <View style={styles.cartTotal}>
          {lotteries &&
            lotteries.map((lotteryGroup, i) => {
              if (lotteryGroup.lotteries.length === 0) {
                return false;
              }
              const firstItem = lotteryGroup.lotteries[0];
              if (!firstItem) {
                return false;
              }
              if (selectedLotteries.indexOf(firstItem.id) === -1) {
                return false;
              }
              return (
                <Text>
                  <Text>
                    {queryType !== "series" && (
                      <TouchableOpacity
                        onPress={() => removeLotteryGroup(lotteryGroup)}
                      >
                        <Text>x</Text>
                      </TouchableOpacity>
                    )}{" "}
                    {firstItem.number}{" "}
                    {lotteryGroup.count > 1 ? "(เลขชุด)" : ""}
                  </Text>
                  <Text>{get(lotteryGroup, "lotteries.length")} ใบ</Text>
                  <Text>{get(lotteryGroup, "lotteries.length") * 80} บาท</Text>
                </Text>
              );
            })}
          <Text>{"-".repeat(50)}</Text>
          <Text>
            <Text>รวมราคา</Text>
            <Text> {amount} ใบ</Text>
            <Text> {amount * LOTTERY_PRICE} บาท</Text>
          </Text>
          <TouchableOpacity>
            <Button title="หยิบใส่ตะกร้า" />
          </TouchableOpacity>
        </View>
      </View>
      {/* เลขที่ใกล้เคียง */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ marginTop: 20, marginBottom: 20 }}>เลขที่ใกล้เคียง</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {take(relatedLotteries, 30).map((item, index) => {
            const firstItem = item.lotteries[0];
            if (firstItem) {
              return (
                <View key={index} style={[styles.lotteryContain]}>
                  {/*>>>>>>>> ฉลากเลขทชุด <<<<<<<<<*/}
                  {lotteryType === "series" ? ( // เลือกว่าเป็นเลขชุด หรือ เลขท้่าย เลขหน้า
                    <View style={[cn(lotteryType)]}>
                      <Text style={styles.textLabel}>
                        เลขชุด{"\n"}
                        <Text style={styles.textLabelNumber}>{item.count}</Text>
                      </Text>
                      <Text style={styles.textLabel}>
                        ใบ{"\n"}{" "}
                        <Text style={styles.textLabelNumber}>
                          {+item.count * 6}
                          {"\n"}
                        </Text>{" "}
                        ล้าน
                      </Text>
                    </View>
                  ) : (
                    <View style={[cn(lotteryType)]}>
                      <Text style={styles.textLabel}>
                        {lotteryType === "first-three" ? "เลขหน้า" : "เลขท้าย"}{" "}
                        {"\n"}
                        <Text style={styles.textLabelNumber}>
                          {/* pae */}
                          {firstItem[lotterGroup]}
                        </Text>
                      </Text>
                      <Text style={styles.textLabel}>
                        จำนวน{"\n"}{" "}
                        <Text style={styles.textLabelNumber}>
                          {item.count}
                          {"\n"}
                        </Text>{" "}
                        ใบ
                      </Text>
                    </View>
                  )}
                  {/*>>>>>>>> จบฉลากเลขทชุด <<<<<<<<<*/}

                  <ScrollView
                    style={{
                      width: lotteryWidth,
                      height: lotteryWidth / 2,
                      borderRadius: 6,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LotteryView", {
                          lastTwonumber: firstItem.lastTwoDigits,
                          amount: 5,
                        }); //ใช้ navigation ส่งค่าไปอีก screen
                      }}
                    >
                      <View
                        style={[
                          {
                            width: lotteryWidth,
                            height: lotteryWidth / 2,
                          },
                        ]}
                      >
                        {take(item.lotteries, 4).map(
                          (lotteryTwo, indexLotterry) => {
                            return (
                              <Image
                                key={indexLotterry}
                                source={{ uri: lotteryTwo.image }}
                                style={[
                                  styles.Image,
                                  {
                                    marginTop:
                                      indexLotterry * marginCalculate(19),
                                    /*เว้น marginTop หวยซ้อนกันแล้วให้เห็นเลข */
                                    width: lotteryWidth,
                                    height: lotteryWidth / 2,
                                  },
                                ]}
                              />
                            );
                          }
                        )}
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
}

export default Detail1;

const styles = StyleSheet.create({
  goldBox: {
    backgroundColor: "#F9F0E1",
    alignItems: "center",
  },
  lottoGroup: {},
  cartTotal: {
    backgroundColor: "pink",
  },
  lotteryContain: {
    marginBottom: 5,
  },
  labelLastTwo: {
    backgroundColor: "rgba(255, 184, 0, 0.9)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    width: "20%",
    height: "100%",
    position: "absolute",
    borderTopStartRadius: 6,
    borderBottomLeftRadius: 6,
  },
  labelFirstThree: {
    backgroundColor: "rgba(0, 240, 255, 0.9)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    width: "20%",
    height: "100%",
    position: "absolute",
    borderTopStartRadius: 6,
    borderBottomLeftRadius: 6,
  },
  labelLastThree: {
    backgroundColor: "rgba(143, 255, 0, 0.9)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    width: "20%",
    height: "100%",
    position: "absolute",
    borderTopStartRadius: 6,
    borderBottomLeftRadius: 6,
  },
  labelSeries: {
    backgroundColor: "rgba(255, 94, 239, 0.9)",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    width: "20%",
    height: "100%",
    position: "absolute",
    borderTopStartRadius: 6,
    borderBottomLeftRadius: 6,
  },
  textLabel: {
    textAlign: "center",
    fontSize: 9,
  },
  textLabelNumber: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },

  Image: {
    resizeMode: "cover",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ffff",
    alignItems: "center",
  },
});
