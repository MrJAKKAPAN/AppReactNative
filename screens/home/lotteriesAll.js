import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import SearchBox from "../../components/SeachBlueBox";
import Searchs from "../../components/SearchButton";
import RNPickerSelect from "react-native-picker-select";
import { TabActions, useFocusEffect } from "@react-navigation/native";
import { CustomTextBold, CustomText } from "../../components/CustomText";
import { ScrollView } from "react-native-gesture-handler";
import BlueBox from "../../components/BlueBox";
import { addItem, clearCart } from "../../helpers/cartAsyn";
import { get, groupBy, map, orderBy, range, take } from "lodash";
import { Chase } from "react-native-animated-spinkit";
import { getRoundDateString } from "../../helpers/helpers";

export default function detail({ route, navigation, roundDate }) {
  const [threeDigitsSearchType, setThreeDigitsSearchType] =
    useState("last-three");
  const [amountLotterySale, setAmountLotterySale] = useState();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const lotteryWidth = screenWidth * 0.47;
  const [lotteries, setLotteries] = useState({});
  const [isLoading, setAppLoading] = useState(true);
  const [lotteriesMatch, setLotteriesMatch] = useState();
  const { lotteryType, lotteryGroup, webConfig } = route.params;
  const [page, setPage] = useState(1);
  const [sum, setSum] = useState(0);
  const [number, setNumber] = useState("");
  const jumpToCart = TabActions.jumpTo("ตระกร้า");

  let url = {
    andriod:
      `https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/${lotteryType}/all?` +
      `page=${page}`,
    ios:
      `https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/${lotteryType}/all?` +
      `page=${page}`,
  };

  const fetchLotteryAll = async () => {
    let res = await fetch(Platform.OS === "android" ? url.andriod : url.ios);
    let data = await res.json();
    setLotteries(data);
    return data;
  };

  useEffect(() => {
    fetchLotteryAll();
    setAppLoading(false);
  }, [page]);

  useFocusEffect(
    React.useCallback(() => {
      setAppLoading(true);
      fetchLotteryAll().then(() => setAppLoading(false));
    }, [page])
  );

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

  const addToCart = (lotteries, type, number) => {
  

    let lotteriesGroup = groupBy(lotteries, "number");
    lotteriesGroup = map(lotteriesGroup, (lotteries, number) => {
      const singleResult = {};
      singleResult.number = number;
      singleResult.lotteries = lotteries;
      singleResult.count = lotteries.length;
      return singleResult;
    });

    lotteriesGroup = orderBy(lotteriesGroup, "count", "asc");

    const amount = get(amountLotterySale, `${type}.${number}`) || 5;
    const selectedLotteries = lotteriesGroup.reduce((result, lotteryGroup) => {
      if (result.length < amount) {
        lotteryGroup.lotteries.forEach((lottery) => {
          result.push(lottery.id);
        });
      }
      return result;
    }, []);

    addItem(selectedLotteries);
    // navigation.navigate("cart");
    navigation.dispatch(jumpToCart);
  };

  /* คำนวณ marginTopให้เว้นข้างบนให้เห็นเลขแต่ล่ะแพลตฟอร์ม */
  const marginCalculate = React.useCallback((marginValue) => {
    return ((screenHeight / (screenHeight / screenWidth)) * marginValue) / 400;
  }, []);

  /* จำนวนหวยทั้งหมดที่ให้เลือก */
  function lotteryAmount(lotteryCount) {
    return Array.from({ length: lotteryCount }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }

  const search = () => {
    let url = "";
    let query = "";
    //if --> detail2; else --> detail1
    if (number.length === 2) {
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: "last-two",
        queryAmount: 5,
      });
    } else if (number.length === 3) {
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: threeDigitsSearchType,
        queryAmount: 5,
      });
    } else if (number.length === 6) {
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
      });
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomText style={{ color: "#3192d2" }}>......Now loading</CustomText>
        <Chase size={48} color="#edcf85" />
      </View>
    );
  }
  if (!lotteries) {
    return (
      <View>
        <Text> Can not load data </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <CustomText
        style={{
          fontSize: 16,
          color: "#0b2760",
          fontWeight: "200",
          textAlign: "center",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {/* เลขเด็ด • งวดวันที่ {getRoundDateString(webConfig.roundDate)} */}
      </CustomText>
      <View style={styles.container}>
        <CustomText>
          เลขเด็ด • งวดวันที่ {getRoundDateString(webConfig.roundDate)}
        </CustomText>
        <View style={{ marginLeft: 5, marginRight: 5 }}>
          <BlueBox>
            <CustomTextBold style={{ fontSize: 22 }}>
              ค้นหาเลขที่ต้องการ
            </CustomTextBold>
            <CustomText> ค้นได้ทั้งเลขหน้า เลขท้าย หรือทั้งหมด</CustomText>
            <View style={{ marginTop: 15 }}>
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

            <View style={{ marginBottom: 10 }}></View>
          </BlueBox>
        </View>

        {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> เลขชุด <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
        <View style={styles.containerMapLotteries}>
          <View style={{ alignItems: "center" }}>
            {/* <Text style={{ fontSize: 20 }}>เลขชุด</Text> */}
            <View style={{ margin: 5 }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {take(lotteries.lotteriesGroups, 30).map((item, index) => {
              const firstItem = item.lotteries[0];

              if (firstItem) {
                return (
                  <View key={index} style={[styles.lotteryContain]}>
                    {/*>>>>>>>> ฉลากเลขทชุด <<<<<<<<<*/}

                    {lotteryType === "series" ? ( // เลือกว่าเป็นเลขชุด หรือ เลขท้่าย เลขหน้า
                      <View style={[styles.labelBox, cn(lotteryType)]}>
                        <Text style={styles.textLabel}>
                          เลขชุด{"\n"}
                          <Text style={styles.textLabelNumber}>
                            {item.count}
                          </Text>
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
                      <View style={[styles.labelBox, cn(lotteryType)]}>
                        <Text style={styles.textLabel}>
                          {"first-three" === lotteryType
                            ? "เลขหน้า"
                            : "เลขท้าย"}{" "}
                          {"\n"}
                          <Text style={styles.textLabelNumber}>
                            {firstItem[lotteryGroup]}
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
                            webConfig: webConfig,
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
          <View style={styles.ContainButtonPageTo}>
            <TouchableOpacity
              onPress={() => {
                setPage(page - 1);
              }}
            >
              {page !== 1 && (
                <View style={styles.buttonPageTo}>
                  <CustomText style={{ color: "#0b275f", fontSize: 13 }}>
                    ← ย้อนกลับ
                  </CustomText>
                </View>
              )}
            </TouchableOpacity>

            <Text>{"      "}</Text>

            <TouchableOpacity
              onPress={() => {
                setPage(page + 1);
              }}
            >
              {lotteries.count / 30 > page && (
                <View style={styles.buttonPageTo}>
                  <CustomText style={{ color: "#0b275f", fontSize: 13 }}>
                    หน้าถัดไป →
                  </CustomText>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> จบเลขชุด <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blueBox: {
    backgroundColor: "#0092d2",
    width: "100%",
    alignItems: "center",
    marginLeft: 0,
    borderRadius: 5,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    marginBottom: 15,
  },
  coverSearch: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  container: {
    // backgroundColor: "#a04200",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  containerMapLotteries: {
    // backgroundColor: "#a04200",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: -8,
  },
  lotteryContain: {
    marginBottom: 5,
  },
  labelBox: {
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
  labelLastTwo: {
    backgroundColor: "rgba(255, 184, 0, 0.9)",
  },
  labelFirstThree: {
    backgroundColor: "rgba(0, 240, 255, 0.9)",
  },
  labelLastThree: {
    backgroundColor: "rgba(143, 255, 0, 0.9)",
  },
  labelSeries: {
    backgroundColor: "rgba(255, 94, 239, 0.9)",
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
  textTitle: {
    fontSize: 24,
    color: "#0b275f",
  },
  textButton: {
    fontSize: 15,
    color: "#473707",
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
  chooseAmount: {
    padding: 5,
    backgroundColor: "#f8f3e3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonToCart: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: "#d4af37",
    width: "100%",
  },
  buttonPageTo: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#0b275f",
    alignItems: "center",
    padding: 7,
    paddingLeft: 15,
    paddingHorizontal: 13,
  },
  ContainButtonPageTo: {
    flexDirection: "row",
    marginTop: 24,
  },
});
