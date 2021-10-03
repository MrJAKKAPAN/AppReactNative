import { get, take, sumBy, remove, first, bindAll } from "lodash";
import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  Button,
  RefreshControl,
} from "react-native";
import { addItem } from "../../helpers/cartAsyn";
import { loadAsync } from "expo-font";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import Load from "../../helpers/load";
import Buttonss from "../../components/BtnGrey";
import LightGold from "../../components/LightGold";
import callApi from "../../assets/api/callApi";

import SliderLottory from "../../components/SliderLottory";
import TextRows from "../../components/TextRow";
import { TabActions } from "@react-navigation/native";
import { CustomText, CustomTextBold } from "../../components/CustomText";
import GoldGradient from "../../components/GoldGradient";

const LOTTERY_PRICE = 80;

function ViewLottery({ route, navigation }) {
  const { number, lotteriesType, queryAmount } = route.params;

  const [amount, setAmount] = useState(queryAmount ? parseInt(queryAmount) : 5);
  const [selectedLotteries, setSelectedLotteries] = useState([]);
  const [lotteries, setLotteries] = useState([]);
  const [lotteryCount, setLotteryCount] = useState([]);
  const [relatedLotteries, setRelatedLotteries] = useState([]);
  const [relatedKey, setRelatedKey] = useState("number");

  const [loterrise, setLoterrise] = useState({});
  //ของพี่ Price
  const [lotteryGroup, setLotteryGroup] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const lotteryWidth = screenWidth * 0.47;
  const [refreshing, setRefreshing] = useState();
  const jumpToCart = TabActions.jumpTo("ตระกร้า");

  useEffect(() => {
    fetchLotteries();
    fetchRelatedLotteries();
  }, [number]);

  const fetchLotteries = async () => {
    try {
      const requestUrl = `/lotteries/carts/${lotteriesType}/${number}`;
      const response = await callApi({
        url: requestUrl,
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
        //จำนวน Lotteries ที่ถูกเลือก
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
    try {
      const url =
        lotteriesType === "series"
          ? `/lotteries/home`
          : `/lotteries/${number}/related?type=${lotteriesType}`;
      const _lotteries = await callApi({
        url: url,
        // url:
      });

      if (_lotteries) {
        switch (lotteriesType) {
          case "last-two":
            setRelatedKey("lastTwoDigits");
            setRelatedLotteries(_lotteries);
            break;
          case "last-three":
            setRelatedKey("lastThreeDigits");
            setRelatedLotteries(_lotteries);
            break;
          case "first-three":
            setRelatedKey("firstThreeDigits");
            setRelatedLotteries(_lotteries);
            break;
          case "series":
            setRelatedKey("number");
            setRelatedLotteries(_lotteries.series);
            break;
          default:
            break;
        }
        setLotteryGroup(lotteriesType);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sumSingleLotteryCount = sumBy(lotteries, (lg) => {
    if (lg.count > 1 || lg.count === 0) return 0;
    const firstItem = lg.lotteries[0];
    if (selectedLotteries.indexOf(firstItem.id) > -1) {
      return 1;
    } else return 0;
  });

  const addItemToCart = async () => {
    let arr = [];
    selectedLotteries.forEach((lotteryId) => {
      arr.push(lotteryId);
    });

    addItem(arr);
    // navigation.navigate("cart");
    navigation.dispatch(jumpToCart);
  };

  let renderSeriesCount = 0;
  const renderSeriesLotteries = (
    lotteryGroup,
    { renderOnlyFirstTwo, ignoreFirstTwo }
  ) => {
    if (get(lotteryGroup, "lotteries.length") > 1) {
      const firstItem = lotteryGroup.lotteries[0];
      if (selectedLotteries.indexOf(firstItem.id) === -1)
        return <CustomText key={firstItem.id}></CustomText>;
      renderSeriesCount++;

      if (renderSeriesCount <= 2 && ignoreFirstTwo)
        return <CustomText key={firstItem.id}></CustomText>;
      if (renderSeriesCount > 2 && renderOnlyFirstTwo)
        return <CustomText key={firstItem.id}></CustomText>;
      return (
        <View key={firstItem.number} style={slides.coverBig}>
          {/* SSSSSSSS */}
          <View style={{ flexDirection: "row" }}>
            {/* {lottery} */}
            <View style={([cn2(lotteriesType)], slides.coverTxt)}>
              <CustomText style={slides.txt}>เลขชุด</CustomText>
              <CustomTextBold style={slides.number}>
                {get(lotteryGroup, "lotteries.length")}
              </CustomTextBold>
              <CustomText style={slides.txt}>ใบ</CustomText>
              <CustomTextBold style={slides.number}>
                {get(lotteryGroup, "lotteries.length") * 6}
              </CustomTextBold>
              <CustomText style={slides.txt}>ล้าน</CustomText>
            </View>
            <View style={slides.coverImg}>
              {take(lotteryGroup.lotteries, 5).map((lottory, i) => {
                return (
                  <Image
                    style={slides.img}
                    source={{ uri: lottory.image }}
                    key={i}
                  />
                );
              })}
            </View>
          </View>
        </View>
      );
    }
  };

  const renderTypeLotteries = (isRender) => {
    if (!isRender) {
      renderSeriesCount = sumSingleLotteryCount + renderSeriesCount;
      return false;
    }
    return (
      sumSingleLotteryCount > 0 && (
        <View
          style={{
            flexDirection: "row",
            borderRadius: 5,
            borderWidth: 3,
            borderColor: "#fff",
          }}
        >
          {/* TTTTTTTTT */}

          <View style={[styles.tabBox, cn2(lotteriesType)]}>
            <CustomText style={{ fontSize: 12 }}>
              {lotteriesType === "first-three" ? "เลขหน้า" : "เลขท้าย"}
            </CustomText>
            <CustomTextBold style={slides.txt}>{number}</CustomTextBold>
            <CustomTextBold style={slides.number}>จำนวน</CustomTextBold>
            <CustomTextBold style={slides.txt}>
              {sumSingleLotteryCount}
            </CustomTextBold>
            <CustomText style={{ fontSize: 12 }}>ใบ</CustomText>
          </View>

          {lotteries &&
            lotteries.map((lotteryGroup, i) => {
              if (get(lotteryGroup, "lotteries.length") === 1) {
                const firstItem = lotteryGroup.lotteries[0];
                if (selectedLotteries.indexOf(firstItem.id) === -1) {
                  return false;
                }
                return (
                  <Image
                    source={{ uri: firstItem.image }}
                    style={slides2.img}
                    key={i}
                  />
                );
              }
              return false;
            })}
        </View>
      )
    );
  };

  const removeLotteryGroup = (lotteryGroup) => {
    setAmount(amount - get(lotteryGroup, "lotteries.length"));
    const newSelectedLotteries = [...selectedLotteries];
    lotteryGroup.lotteries.forEach((lottery) => {
      remove(newSelectedLotteries, (lotId) => lottery.id === lotId);
    });
    setSelectedLotteries(newSelectedLotteries);
  };

  const amountHandler = (input) => {
    if (input === "") {
      input = 0;
    } else if (parseInt(input) > lotteryCount) {
      input = lotteryCount;
    } else if (isNaN(input)) {
      input = 0;
    }
    let totalLotteryCount = parseInt(input);
    setAmount(totalLotteryCount);

    let newSelectedLotteries = [];
    for (let i = 0; i < lotteries.length; i++) {
      const lotteryGroup = lotteries[i];
      if (newSelectedLotteries.length < totalLotteryCount) {
        lotteryGroup.lotteries.forEach((lottery) => {
          newSelectedLotteries.push(lottery.id);
        });
      } else {
        break;
      }
    }
    setSelectedLotteries(newSelectedLotteries);
  };

  const cn = (lotteriesType) => {
    switch (lotteriesType) {
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

  const cn2 = (lotteriesType) => {
    switch (lotteriesType) {
      case "last-two":
        return styles.tabLastTwo;
      case "first-three":
        return styles.tabFirstThree;
      case "last-three":
        return styles.tabLastThree;
      case "series":
        return styles.tabSeries;
      default:
        break;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchLotteries(), fetchRelatedLotteries()])
    .then(() =>
      setRefreshing(false)
    )
  };

  /* คำนวณ marginTopให้เว้นข้างบนให้เห็นเลขแต่ล่ะแพลตฟอร์ม */
  const marginCalculate = (marginValue) => {
    return ((screenHeight / (screenHeight / screenWidth)) * marginValue) / 400;
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
        <CustomTextBold style={{ color: "#0b2760" }}>
          ข้อมูลลอตเตอรี่
        </CustomTextBold>
      </View>
      {lotteries.length === 0 ? (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#f5f0df",
              width: "85%",
              paddingTop: 30,
              paddingBottom: 30,
            }}
          >
            <CustomTextBold
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#0b2760",
              }}
            >
              ไม่พบลอตเตอรี่ที่ค้นหา
            </CustomTextBold>
            <CustomText style={{ textAlign: "center", color: "#0b2760" }}>
              ลองเลือกเลขอื่นๆ ดูอีกครั้ง
            </CustomText>
          </View>
        </View>
      ) : (
        <View style={{ backgroundColor: "#f5f0df", padding: 5, margin: 10 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            {lotteries &&
              lotteries.map((lotteryGroup) => {
                return renderSeriesLotteries(lotteryGroup, {
                  renderOnlyFirstTwo: true,
                });
              })}
            {renderTypeLotteries(renderSeriesCount < 2)}
          </ScrollView>
          <CustomTextBold style={tables.header}>
            พบลอตเตอรี่จำนวน {lotteryCount} ใบ
          </CustomTextBold>
          {lotteriesType !== "series" && (
            <View style={tables.colorInput}>
              <CustomTextBold style={tables.header2}>
                เลือกลอตเตอรี่{" "}
              </CustomTextBold>

              <TextInput
                style={tables.input}
                onChangeText={(text) => amountHandler(text)}
                value={amount.toString()}
                keyboardType="number-pad"
              />
              <CustomText style={tables.header2}> ใบ</CustomText>
            </View>
          )}
          {lotteries &&
            lotteries.map((lotteryGroup, i) => {
              if (lotteryGroup.lotteries.length === 0) {
                return false; //<tr key={i}></tr>;
              }
              const firstItem = lotteryGroup.lotteries[0];
              if (!firstItem) {
                return false; //<tr key={i}></tr>;
              }
              if (selectedLotteries.indexOf(firstItem.id) === -1) {
                return false; //<tr key={i}></tr>;
              }

              return (
                <View key={i} style={{ padding: 3 }}>
                  <TextRows
                    Price={get(lotteryGroup, "lotteries.length") * 80}
                    Number={firstItem.number}
                    Amount={get(lotteryGroup, "lotteries.length")}
                    Color="#0b2760"
                    Count={lotteryGroup.count}
                    iconName="close"
                    statusIcon="true"
                    lotteriesType={lotteriesType}
                    IconImage={require("../../assets/images/cancelWhite.png")}
                    onPress={() => removeLotteryGroup(lotteryGroup)}
                  />
                </View>
              );
            })}
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomText style={{ marginLeft: 8, color: "#0b2760" }}>
              ราคารวม
            </CustomText>
            <CustomTextBold
              style={{
                marginLeft: 110,
                color: "#0b2760",
                fontSize: 17,
              }}
            >
              {amount} ใบ
            </CustomTextBold>
            <CustomTextBold
              style={{
                marginRight: 16,
                fontSize: 20,
                color: "#0b2760",
              }}
            >
              {amount * LOTTERY_PRICE} บาท
            </CustomTextBold>
          </View>
          <View
            style={{
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 15,
            }}
          />
          <TouchableOpacity onPress={() => addItemToCart()}>
            <GoldGradient
              style={{
                padding: 10,
                alignItems: "center",
                borderRadius: 3,
                width: "100%",
              }}
            >
              <CustomText style={{ color: "#473707" }}>
                หยิบใส่ตะกร้า
              </CustomText>
            </GoldGradient>
          </TouchableOpacity>
        </View>
      )}

      <View>
        {/* RRRRRRRRRR */}
        <CustomText
          style={{
            textAlign: "center",
            marginTop: 3,
            marginBottom: 20,
            color: "#0b2760",
          }}
        >
          เลขที่ใกล้เคียง
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {relatedLotteries.map((item, index) => {
            const firstItem = item.lotteries[0];

            if (firstItem) {
              if (firstItem[relatedKey] === number) {
                return <CustomText key={index}></CustomText>;
              }

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("LotteryView", {
                      queryAmount: queryAmount,
                      lotteriesType: lotteriesType,
                      number: firstItem[relatedKey],
                    })
                  }
                >
                  <View style={styles.lotteryContain}>
                    {/*>>>>>>>> ฉลากเลขทชุด <<<<<<<<<*/}

                    {lotteriesType === "series" ? ( // เลือกว่าเป็นเลขชุด หรือ เลขท้่าย เลขหน้า
                      <View style={[cn(lotteriesType)]}>
                        <CustomText style={styles.textLabel}>
                          เลขชุด
                        </CustomText>
                        <CustomText style={styles.textLabelNumber}>
                            {item.count}
                          </CustomText>
                        <CustomText style={styles.textLabel}>
                          ใบ{"\n"}{" "}
                          <CustomText style={styles.textLabelNumber}>
                            {+item.count * 6}
                          </CustomText>{" "}
                          ล้าน
                        </CustomText>
                      </View>
                    ) : (
                      <View style={[cn(lotteriesType)]}>
                        <CustomText style={styles.textLabel}>
                          {"first-three" === lotteriesType
                            ? "เลขหน้า"
                            : "เลขท้าย"}{" "}
                          {"\n"}
                          <CustomTextBold style={styles.textLabelNumber}>
                            {firstItem[relatedKey]}
                          </CustomTextBold>
                        </CustomText>
                        <CustomText style={styles.textLabel}>จำนวน</CustomText>
                        <CustomTextBold style={styles.textLabelNumber}>
                          {item.count}
                        </CustomTextBold>
                        <CustomText style={styles.textLabel}>ใบ</CustomText>
                      </View>
                    )}
                    {/*>>>>>>>> จบฉลากเลขทชุด <<<<<<<<<*/}

                    <ScrollView>
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
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    </ScrollView>
  );
}

export default ViewLottery;

const styles = StyleSheet.create({
  tabLastTwo: {
    backgroundColor: "rgba(255, 184, 0, 0.9)",
  },
  tabFirstThree: {
    backgroundColor: "rgba(0, 240, 255, 0.9)",
  },
  tabLastThree: {
    backgroundColor: "rgba(143, 255, 0, 0.9)",
  },
  tabSeries: {
    backgroundColor: "rgba(255, 94, 239, 0.9)",
  },
  tabBox: {
    zIndex: 1,
    position: "absolute",
    alignItems: "center",
    padding: 5,
    borderTopLeftRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#fff",
  },
  // P.Prince
  container: {
    // backgroundColor: "#a04200",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -7,
  },
  containerMapLotteries: {
    // backgroundColor: "#a04200",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  lotteryContain: {
    marginBottom: 5,
  },
  infoLabel: {
    backgroundColor: "#efbd40",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    width: "20%",
    position: "absolute",
    borderTopStartRadius: 6,
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
    color: "#000f",
    textAlign: "center",
    fontSize: 9,
  },
  textLabelNumber: {
    color: "#000f",
    textAlign: "center",
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
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#fff",
    alignItems: "center",
  },
  chooseAmount: {
    padding: 5,
    backgroundColor: "#f8f3e3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  BlockSelect: {
    marginHorizontal: 10,
    width: 60,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#d4af37",
    alignItems: "center",
    backgroundColor: "#f8f3e3",
    justifyContent: "center",
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

const tables = StyleSheet.create({
  colorInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    color: "#0b2760",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  header2: {
    textAlign: "center",
    color: "#0b2760",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
  },
  input: {
    backgroundColor: "#fff",
    width: 50,
    height: 30,
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#0b2760",
    fontFamily: "Anuphan-Bold",
  },
});

const slides2 = StyleSheet.create({
  coverImg: {
    flexDirection: "row",
  },
  img: {
    width: 365,
    height: 180,
  },
});

const slides = StyleSheet.create({
  coverBig: {
    // backgroundColor: "orange",
    // width: "50%",
    // padding: 5,
  },
  coverTxt: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 94, 239, 0.9)",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopLeftRadius: 5,
  },
  coverTxt2: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopLeftRadius: 5,
  },
  txt: {
    fontSize: 10,
    color: "#000f",
  },
  number: {
    fontSize: 20,
    color: "#000f",
  },
  coverImg: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 1,
    borderRadius: 5,
  },
  img: {
    width: 365,
    height: 180,
    borderRadius: 5,
  },
});
