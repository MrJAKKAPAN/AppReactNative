//>>>>>>>>>>>>>>>>>>>>>>>>> Prince create >>>>>>>>>>>> หน้าขายลอตเตอรี่

import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { TabActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";
import { get, groupBy, map, orderBy, range, take } from "lodash";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";

import GoldGradient from "../../../components/GoldGradient";
import { addItem, clearCart } from "../../../helpers/cartAsyn";
import { showLoading, hideLoading } from "../../../reducers/loading";
import { CustomText, CustomTextBold } from "../../../components/CustomText";
import { Chase } from 'react-native-animated-spinkit'


export default function lotteryList({ route, navigation, refreshLottery, webConfig}) {
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const lotteryWidth = screenWidth * 0.47;
  const [lotteries, setLotteries] = useState([]);
  const [isLoading, setAppLoading] = useState(true);
  let controller = new AbortController();
  const [amountLotterySale, setAmountLotterySale] = useState({
    "last-two": {},
    "last-three": {},
    "first-two": {},
    "series": {},
  });
  const jumpToCart = TabActions.jumpTo("ตระกร้า");

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      setAppLoading(true)
      if (mounted) {
        fetchLotteries()
          .finally(() => setAppLoading(false))
          .catch((error) => console.log("from errrror", error));
      }
      return () => {
        controller.abort();
        mounted = false;
      };
    }, [refreshLottery])
  );

  const fetchLotteries = async () => {
    try {
      let res = await fetch(
        Platform.OS === "android"
          ? "https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/home"
          : "https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/home",
        { signal: controller.signal }
      );
      let data = await res.json();
      if (data) {
        setLotteries(data);
        setAppLoading(false);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchLotteries()
        .then(() => {
          return true;
        })
        .catch((error) => console.log("from errrror", error));
    }
    return () => {
      controller.abort();
      mounted = false;
    };
  }, []);

  const addToCart = async (lotteries, type, number) => {

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
const add = async () => {
 await addItem(selectedLotteries);
        navigation.dispatch(TabActions.jumpTo("ตระกร้า"));
}
add();
  };

  const onAmountChange = (type, key, amount) => {
    setAmountLotterySale({
      ...amountLotterySale,
      [type]: {
        ...amountLotterySale[type],
        [key]: amount,
      },
    });
  };

  /* คำนวณ marginTopให้เว้นข้างบนให้เห็นเลขแต่ล่ะแพลตฟอร์ม */
  const marginCalculate = (marginValue) => {
    return ((screenHeight / (screenHeight / screenWidth)) * marginValue) / 400;
  };

  /* จำนวนหวยทั้งหมดที่ให้เลือก */
  function lotteryAmount(lotteryCount) {
    return Array.from({ length: lotteryCount }, (_, i) => ({
      label: `${i + 1}`,
      value: `${i + 1}`,
    }));
  }

  if (isLoading) {
    return (
      <View
        style={{ width: "100%", height: "100%",justifyContent:"center",alignItem:"center" }}
      >
        <CustomText style={{color:"#3192d2"}}>......Now loading</CustomText>
        <Chase size={48} color="#edcf85" />
      </View>
    );
  }
  if (!lotteries) {
    return (
      <View>
        <Text> Can not load data</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* ///// กดลบ ///// */}
      <TouchableOpacity onPress={() => clearCart()}>
        <CustomText style={{ color: "#0b275f", fontSize: 15 }}>กดลบ</CustomText>
      </TouchableOpacity>
      {/* ////////////////////////////// เลขชุด ////////////////////////////// */}
      <View style={styles.containerMapLotteries}>
        <View style={{ alignItems: "center" }}>
          <CustomTextBold style={styles.textTitle}>เลขชุด</CustomTextBold>
          <View style={{ margin: 5 }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {take(lotteries.series, 4).map((item, index) => {
            const firstItem = item.lotteries[0];

            return (
              <View key={index} style={[styles.lotteryContain, ,]}>
                {/*>>>>>>>> ฉลากเลขทชุด <<<<<<<<<*/}
                <View
                  style={[
                    styles.infoLabel,
                    { height: lotteryWidth / 2, backgroundColor: "#f877f0" },
                  ]}
                >
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
                {/*>>>>>>>> จบฉลากเลขทชุด <<<<<<<<<*/}

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("LotteryView", {
                      number: firstItem.number,
                      lotteriesType: "series",
                      queryAmount: 5,
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
                                marginTop: indexLotterry * marginCalculate(19),
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

                <TouchableOpacity
                  onPress={() => {
                    addToCart(
                      item.lotteries,
                      "last-two",
                      firstItem.lastTwoDigits
                    );
                  }}
                >
                  <View
                    style={[styles.buttonToCart, { height: lotteryWidth / 5 }]}
                  >
                    <GoldGradient
                      style={[
                        styles.buttonToCart,
                        { height: lotteryWidth / 5 },
                      ]}
                    >
                      <CustomText style={styles.textButton}>
                        ซื้อชุดนี้
                      </CustomText>
                    </GoldGradient>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LotteriesAll", {
                lotteryType: "series",
                lotteryGroup: "series",
                webConfig:webConfig
              }); //ใช้ navigation ส่งค่าไปอีก screen
            }}
          >
            <CustomText style={{ color: "#0b275f", fontSize: 15 }}>
              ดูเลขชุดทั้งหมด →
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      {/* ////////////////////////////// จบเลขชุด ////////////////////////////// */}

      {/* ////////////////////////////// เลขท้าย2ตัวมาแรง! ////////////////////////////// */}
      <View style={styles.containerMapLotteries}>
        <View style={{ alignItems: "center" }}>
          {/* <Text style={{ fontSize: 20 }}>เลขชุด</Text> */}
          <CustomTextBold style={{ fontSize: 20, color: "#0b275f" }}>
            เลขท้าย 2 ตัวมาแรง!
          </CustomTextBold>
          <View style={{ margin: 5 }} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {take(lotteries.twoDigits, 4).map((item, index) => {
            const firstItem = item.lotteries[0];

            return (
              <View key={index} style={[styles.lotteryContain]}>
                {/*ฉลากเลขท้ายสองตัว */}
                <View style={[styles.infoLabel, { height: lotteryWidth / 2 }]}>
                  <Text style={styles.textLabel}>
                    เลขท้าย{"\n"}
                    <Text style={styles.textLabelNumber}>
                      {item.lotteries[0].lastTwoDigits}
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
                {/*ฉลากเลขท้ายสองตัว */}

                <View
                  style={{
                    width: lotteryWidth,
                    height: lotteryWidth / 2,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("LotteryView", {
                        number: firstItem.lastTwoDigits,
                        lotteriesType: "last-two",
                        queryAmount: 5,
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
                </View>
                <View>
                  <View style={[styles.chooseAmount]}>
                    <CustomText style={styles.textButton}>เลือก</CustomText>
                    <View style={styles.BlockSelect}>
                      <RNPickerSelect
                        placeholder={{ label: "5" }}
                        onValueChange={(value) =>
                          onAmountChange(
                            "last-two",
                            firstItem.lastTwoDigits,
                            value
                          )
                        }
                        value={
                          get(
                            amountLotterySale,
                            `last-two.${firstItem.lastTwoDigits}`
                          ) || 5
                        }
                        items={lotteryAmount(item.count)}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <CustomText style={styles.textButton}>ใบ</CustomText>
                  </View>
                </View>

                {/* BUTTON ADD TO CART */}
                <TouchableOpacity
                  onPress={() =>
                    addToCart(
                      item.lotteries,
                      "last-two",
                      firstItem.lastTwoDigits
                    )
                  }
                >
                  <View
                    style={[styles.buttonToCart, { height: lotteryWidth / 5 }]}
                  >
                    <GoldGradient
                      style={[
                        styles.buttonToCart,
                        { height: lotteryWidth / 5 },
                      ]}
                    >
                      <CustomText style={styles.textButton}>
                        หยิบใส่ตะกร้า
                      </CustomText>
                    </GoldGradient>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LotteriesAll", {
                lotteryType: "last-two",
                lotteryGroup: "lastTwoDigits",
                webConfig:webConfig
              }); //ใช้ navigation ส่งค่าไปอีก screen
            }}
          >
            <CustomText style={{ color: "#0b275f", fontSize: 15 }}>
              ดูเลขท้าย 2 ตัวทั้งหมด →
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>

      {/* //////////////////////////////  จบเลขท้าย2ตัวมาแรง!  ////////////////////////////// */}

      {/* //////////////////////////////  เลขท้าย3ตัว  ////////////////////////////// */}
      <View style={styles.containerMapLotteries}>
        <View style={{ alignItems: "center" }}>
          {/* <Text style={{ fontSize: 20 }}>เลขชุด</Text> */}
          <CustomTextBold style={{ fontSize: 20, color: "#0b275f" }}>
            เลขท้าย 3 ตัว
          </CustomTextBold>
          <View style={{ margin: 5 }} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {take(lotteries.threeDigits, 4).map((item, index) => {
            const firstItem = item.lotteries[0];

            return (
              <View key={index} style={[styles.lotteryContain]}>
                {/*ฉลากเลขท้ายสองตัว */}
                <View
                  style={[
                    styles.infoLabel,
                    { height: lotteryWidth / 2, backgroundColor: "#94fa3e" },
                  ]}
                >
                  <Text style={styles.textLabel}>
                    เลขท้าย{"\n"}
                    <Text style={styles.textLabelNumber}>
                      {item.lotteries[0].lastThreeDigits}
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
                {/*ฉลากเลขท้ายสองตัว */}

                <View
                  style={{
                    width: lotteryWidth,
                    height: lotteryWidth / 2,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("LotteryView", {
                        number: firstItem.lastThreeDigits,
                        lotteriesType: "last-three",
                        queryAmount: 5,
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
                </View>
                <View>
                  <View style={[styles.chooseAmount]}>
                    <CustomText style={styles.textButton}>เลือก</CustomText>
                    <View style={styles.BlockSelect}>
                      <RNPickerSelect
                        placeholder={{ label: "5", value: "5" }}
                        onValueChange={(value) => setAmountLotterySale(value)}
                        items={lotteryAmount(item.count)}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <CustomText style={styles.textButton}>ใบ</CustomText>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    addToCart(
                      item.lotteries,
                      "last-three",
                      firstItem.lastThreeDigits
                    )
                  }
                >
                  <View
                    style={[styles.buttonToCart, { height: lotteryWidth / 5 }]}
                  >
                    <GoldGradient
                      style={[
                        styles.buttonToCart,
                        { height: lotteryWidth / 5 },
                      ]}
                    >
                      <CustomText style={styles.textButton}>
                        หยิบใส่ตะกร้า
                      </CustomText>
                    </GoldGradient>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LotteriesAll", {
                lotteryType: "last-three",
                lotteryGroup: "lastThreeDigits",
                  webConfig:webConfig,
              }); //ใช้ navigation ส่งค่าไปอีก screen
            }}
          >
            <CustomText style={{ color: "#0b275f", fontSize: 15 }}>
              ดูเลขท้าย 3 ตัวทั้งหมด →
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      {/* //////////////////////////////   จบเลขท้าย3ตัว ////////////////////////////// */}

      {/* ////////////////////////////// เลขหน้่า3ตัว ////////////////////////////// */}
      <View style={styles.containerMapLotteries}>
        <View style={{ alignItems: "center" }}>
          {/* <Text style={{ fontSize: 20 }}>เลขชุด</Text> */}
          <CustomTextBold style={{ fontSize: 20, color: "#0b275f" }}>
            เลขท้าย 3 ตัว
          </CustomTextBold>
          <View style={{ margin: 5 }} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {take(lotteries.firstThreeDigits, 4).map((item, index) => {
            const firstItem = item.lotteries[0];

            return (
              <View key={index} style={[styles.lotteryContain]}>
                {/*ฉลากเลขท้ายสองตัว */}
                <View
                  style={[
                    styles.infoLabel,
                    {
                      height: lotteryWidth / 2,
                      backgroundColor: "rgba(0, 240, 255, 0.9)",
                    },
                  ]}
                >
                  <Text style={styles.textLabel}>
                    เลขหน้า{"\n"}
                    <Text style={styles.textLabelNumber}>
                      {item.lotteries[0].firstThreeDigits}
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
                {/*ฉลากเลขท้ายสองตัว */}

                <View
                  style={{
                    width: lotteryWidth,
                    height: lotteryWidth / 2,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("LotteryView", {
                        number: firstItem.firstThreeDigits,
                        lotteriesType: "first-three",
                        queryAmount: 5,
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
                </View>
                <View>
                  <View style={[styles.chooseAmount]}>
                    <CustomText style={styles.textButton}>เลือก</CustomText>
                    <View style={styles.BlockSelect}>
                      <RNPickerSelect
                        placeholder={{ label: "5", value: "5" }}
                        onValueChange={(value) => setAmountLotterySale(value)}
                        items={lotteryAmount(item.count)}
                        style={pickerSelectStyles}
                      />
                    </View>
                    <CustomText style={styles.textButton}>ใบ</CustomText>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    addToCart(
                      item.lotteries,
                      "last-three",
                      firstItem.lastThreeDigits
                    )
                  }
                >
                  <View
                    style={[styles.buttonToCart, { height: lotteryWidth / 5 }]}
                  >
                    <GoldGradient
                      style={[
                        styles.buttonToCart,
                        { height: lotteryWidth / 5 },
                      ]}
                    >
                      <CustomText style={styles.textButton}>
                        หยิบใส่ตะกร้า
                      </CustomText>
                    </GoldGradient>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LotteriesAll", {
                lotteryType: "first-three",
                lotteryGroup: "firstThreeDigits",
                webConfig:webConfig,
              }); //ใช้ navigation ส่งค่าไปอีก screen
            }}
          >
            <CustomText style={{ color: "#0b275f", fontSize: 15 }}>
              ดูเลขหน้า 3 ตัวทั้งหมด →
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      {/*----------------------------------------------------------------   จบเลขหน้า3ตัว ---------------------------------------------------------------- */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -7,
  },
  containerMapLotteries: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  lotteryContain: {
    borderRadius: 7,
    backgroundColor: "#fbe599",
    marginBottom: 5,
  },
  infoLabel: {
    backgroundColor: "#efbd40",
    justifyContent: "center",
    flexDirection: "column",
    borderTopStartRadius: 6,
    alignItems: "center",
    position: "absolute",
    width: "20%",
    zIndex: 100,
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
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    borderColor: "#fff",
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 2,
  },
  chooseAmount: {
    backgroundColor: "#f8f3e3",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
  },
  BlockSelect: {
    backgroundColor: "#f8f3e3",
    justifyContent: "center",
    borderColor: "#d4af37",
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 2,
    width: 60,
  },
  buttonToCart: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: "#fbe599",
    width: "100%",
  },
});

/* STYLE of PICKER SELECT DROPDOWN */
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 5,
    paddingRight: 30, // to ensure the text is never behind the icon
    borderColor: "gray",
  },
  inputAndroid: {
    fontSize: 1,
    height: 25,
    color: "black",
    paddingRight: 85, // to ensure the text is never behind the icon
    borderWidth: 0.5,
  },
});


