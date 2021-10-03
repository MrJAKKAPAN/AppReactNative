// game
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Chase } from "react-native-animated-spinkit";
import { useDispatch, useSelector } from "react-redux";
import { get, remove, reduce, groupBy, find } from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { TabActions, useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import TagHr from "../../components/TagHr";
import Btn from "../../components/BtnGrey";
import ImageLottery from "./imageLotterise";
import callApi from "../../assets/api/callApi";
import GoldBox from "../../components/GoldBox";
import DarkGoldGradient from "../../components/DarkGoldGradient";
import { CustomText, CustomTextBold } from "../../components/CustomText";
import TextRows from "../../components/TextRow";
import Unline from "../../components/UnderLine";
import Fader from "../../components/TimeText12";

import { showLoading, hideLoading } from "../../reducers/loading";
import { getCart, removeItem, clearCart } from "../../helpers/cartAsyn";

export default function App({ navigation, props }) {
  const dispatch = useDispatch();
  const context = useContext(AppStateContext);

  const [credit, setCredit] = useState(0);
  const [lotteries, setLotteries] = useState([]);
  const [couponCode, setCouponCode] = useState();
  const [invalidMsg, setInvalidMsg] = useState();
  const [cartResult, setCartResult] = useState({});
  const [couponDetail, setcouponDetail] = useState({});

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [isUsableCoupon, setIsUsableCoupon] = useState(false);
  const [creditPointToUse, setCreditPointToUse] = useState("");

  const jumpToHome = TabActions.jumpTo("หน้าหลัก");
  const jumpToMember = TabActions.jumpTo("สมาชิก");

  let stillMounted = { value: false };

  useEffect(() => {
    stillMounted.value = true;
    return () => stillMounted.value === false;
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      Promise.all([fetchLotteries(), fetchCartResult()])
        .then(() => {
          setIsLoading(false);
          return;
        })
        .finally(() => setIsLoading(false))
        .catch((err) => console.log(err));
    }, [refreshing])
  );


  useFocusEffect(
    React.useCallback(() => {
      if (!lotteries) {
        const removeItemFromCart = async () => {
          const cartss = await SecureStore.getItemAsync("cart");
          if (!cartss)
            setTimeout(() => {
              navigation.dispatch(jumpToHome);
            }, 3000);
        };
        removeItemFromCart();
      }
    }, [lotteries])
  );


  const fetchLotteries = async () => {
    try {
      let cart = await getCart();
      setIsLoading(true);
      if (!cart) return console.log("cart emty");
      let ids = cart.items.join(",");
      const _lotteries = await axios
        .get(
          `https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/carts?ids=${ids}`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err));

      let onlyNotBoughtLotteries = [];
      if (_lotteries) {
        onlyNotBoughtLotteries = _lotteries.reduce((result, lottery) => {
          if (lottery.isBought !== true) {
            result.push(lottery);
          } else {
            removeItem(lottery.id);
          }
          return result;
        }, []);
        setLotteries(_lotteries);
        setIsLoading(false);
        if (lotteries !== undefined) {
        }
      }
      cart.items.forEach(async (item) => {
        if (!find(_lotteries, { id: item })) {
          const removeItemInCart = async (item) => {
            await removeItem(item);
          };
          removeItemInCart(item);
        }
      });
      setIsLoading(true);

      if (onlyNotBoughtLotteries.length === 0) {
        setTimeout(() => {
          if (stillMounted.value) {
            navigation.dispatch(jumpToHome);
          }
        }, 10000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCartResult = async () => {
    try {
      let cart = await getCart();

      if (!cart) return console.log("cart emty");
      let ids = cart.items;
      const _cartResult = await axios
        .post(
          "https://us-central1-kslstaging.cloudfunctions.net/api/v1/orders/calculate",
          { lotteries: ids }
        )
        .then((res) => res.data);
      if (_cartResult) {
        setCartResult(_cartResult);
        context.setBadgeCartTab(
          _cartResult.itemCount > 0 ? _cartResult.itemCount : null
        );
        console.log("_cartResult", _cartResult);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    Promise.all([fetchLotteries(), fetchCartResult()]).then(() => {
      setRefreshing(false);
      setIsLoading(false);
    });
  };
  // const onRefreshRow = () => {
  //   setRefreshPage(true);
  //   setIsLoadingPage(true);
  //   Promise.all([fetchLotteries(), fetchCartResult()]).then(() => {
  //     setRefreshPage(false);
  //     setIsLoadingPage(false);
  //   });
  // };

  const makeOrder = async () => {
    if (!context.me) {
      alert("กรุณาสมัครสมาชิกก่อนสั่งซื้อ");
      navigation.dispatch(jumpToMember);
    }
    try {
      const agentId = await SecureStore.getItemAsync("agent");
      let lotteriesToBuy = [];
      lotteries.forEach((lottery) => {
        if (lottery.isBought !== true) {
          lotteriesToBuy.push(lottery);
        }
      });

      let useCreditPointStatus = {};
      if (creditPointToUse !== "") {
        useCreditPointStatus = await callApi({
          url: "/referrals/useCredit",
          body: {
            amount: parseInt(creditPointToUse),
          },
        });
      }
      const result = await callApi({
        url: "/orders",
        body: {
          lotteries: lotteriesToBuy.map((lottery) => lottery.id),
          agent: agentId,
          coupon:
            Object.keys(couponDetail).length > 0 ? couponDetail : undefined,
          referralCredit: useCreditPointStatus.result
            ? useCreditPointStatus.credit
            : undefined,
        },
      });

      if (result.id && isUsableCoupon) {
        await axios.put(
          "https://us-central1-kslstaging.cloudfunctions.net/api/v1/coupons/setOrder",
          {
            couponId: couponDetail.id,
            orderId: result.id,
          }
        );
      }
      clearCart();
      navigation.navigate("Payments", { orderId: result.id });
    } catch (err) {
      setIsLoading(false);
      const error = get(err, "reason.message");
      if (error) {
        alert(error);
      }
    }
  };

  const formattedLotteries = lotteries.map((lottery) => {
    return {
      ...lottery,
      firstThreeDigits: lottery.number.substring(0, 3),
      lastTwoDigits: lottery.number.substring(
        lottery.number.length - 2,
        lottery.number.length
      ),
      lastThreeDigits: lottery.number.substring(
        lottery.number.length - 3,
        lottery.number.length
      ),
    };
  });
  let maxCount = 0;

  const groupLotteries = (initLotteries, groupType) => {
    let lotteriesGroupByNumber = groupBy(initLotteries, groupType);
    const remainingLotteries = [];
    const groupResults = reduce(
      lotteriesGroupByNumber,
      (result, lotteryGroup, key) => {
        if (lotteryGroup.length > 1) {
          const firstItem = lotteryGroup[0];
          result.push({
            lotteries: lotteryGroup,
            number: firstItem.number,
            groupKey: key,
            count: lotteryGroup.length,
          });
        } else {
          remainingLotteries.push(...lotteryGroup);
        }
        maxCount =
          maxCount > lotteryGroup.length ? maxCount : lotteryGroup.length;
        return result;
      },
      []
    );
    return {
      result: groupResults,
      remaining: remainingLotteries,
    };
  };

  const numberGroupResult = groupLotteries(formattedLotteries, "number");
  const seriesLotteries = numberGroupResult.result;

  const renderSummaryTable = (lotteryGroup) => {
    return (
      <View style={{ padding: 3 }} key={lotteryGroup.number}>
        <View style={{ flexDirection: "row", margin: 2 }}>
          <TouchableOpacity
            onPress={
              () => {
                if (lotteryGroup.lotteries) {
                  const newLotteries = lotteries;
                  lotteryGroup.lotteries.forEach((lottery) => {
                    const removeItemFromCart = async () => {
                      await removeItem([lottery.id]);
                    };
                    removeItemFromCart(lottery);
                    remove(lotteries, (item) => {
                      return item.id === lottery.id;
                    });
                  });
                  setLotteries(newLotteries);
                } else {
                  const removeItemFromCart = async () => {
                    await removeItem([lotteryGroup.id]);
                  };
                  removeItemFromCart(lotteryGroup);

                  const newLotteries = lotteries;
                  remove(lotteries, (item) => {
                    return item.id === lotteryGroup.id;
                  });
                  setLotteries(newLotteries);
                }
                onRefresh();
              }
            }
          >
            <Image
              source={require("../../assets/images/cancelWhite.png")}
              style={{ width: 16, height: 16, marginTop: 6, marginEnd: 7 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginTop: 2,
              justifyContent: "space-between",
              width: Platform.OS === "ios" ? "90%" : "90%",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: "#fff",
                }}
              >
                {lotteryGroup.number} {"(เลขชุด)"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "45%",
                marginTop: -2,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  {lotteryGroup.count} ใบ
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  {lotteryGroup.count * 80} บาท
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.3,
            background: "none",
          }}
        >
          {/* <Chase size={100} color="#edcf85" /> */}
        </View>
    );
  }
  return (
    <>
      <ScrollView
        style={{ backgroundColor: "#f5f5f7" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={{ margin: 8 }} />
          <Text style={styles.Title}>ตระกร้าใส่ลอตเตอรี่</Text>

          {!lotteries || lotteries.length === 0 || lotteries.length < 0 ? (
            <DarkGoldGradient
              style={{
                padding: 20,
                marginBottom: 7,
                borderRadius: 7,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomTextBold
                style={{
                  fontSize: 22,
                  marginBottom: 7,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                คุณยังไม่ได้เลือกลอตเตอรี่
              </CustomTextBold>
              <CustomText style={{ fontSize: 14, color: "#fff" }}>
                ระบบจะพาไปหน้าแรก ภายใน 30 วินาที
              </CustomText>
            </DarkGoldGradient>
          ) : (
            <>
              <GoldBox>
                <ImageLottery lotteries={formattedLotteries} showScroll />
                <View>
                  <View>
                    <Text
                      style={{
                        marginTop: 5,
                        marginBottom: 25,
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#fff",
                        fontFamily: "Anuphan-SemiBold",
                      }}
                    >
                      ลอตเตอรี่ที่เลือก
                    </Text>
                  </View>

                  <View>
                    {seriesLotteries &&
                      seriesLotteries.map((lotteryGroup) => {
                        return renderSummaryTable(lotteryGroup);
                      })}

                    {numberGroupResult &&
                      numberGroupResult.remaining &&
                      numberGroupResult.remaining.map((lottery) => {
                        return renderSummaryTable({ ...lottery, count: 1 });
                      })}

                    <View
                      style={[
                        styles.containerRow,
                        { alignItems: "center", marginTop: 25 },
                      ]}
                    >
                      <TextRows
                        Number="ค่าล็อตเตอรี่"
                        Amount={cartResult.itemCount}
                        Price={cartResult.price}
                        fontSize={15}
                        Color="#fff"
                        marginBottom={10}
                        statusIcon={false}
                      />

                      <TagHr marginTop={25} />
                      <Unline margin={10} />
                      <TextRows
                        Amount={cartResult.itemCount}
                        Price={cartResult.totalPrice}
                        statusIcon={false}
                        Color="#fff"
                        Number="ราคารวม"
                        fontWeight="bold"
                      />
                      <TagHr marginTop={25} />
                    </View>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <Fader maxCount={maxCount} />

                    <View style={{ margin: 5 }} />
                    <View style={{ marginTop: 5, width: "100%" }}>
                      <Btn
                        onPress={() => makeOrder()}
                        // !isOrderLoading && isCheckConsent && makeOrder()}
                        // onPress={() => beforePayment()}
                        text="ชำระเงิน"
                        color="#fbe599"
                        style={{ width: "100%" }}
                      />
                    </View>
                    <View style={{ margin: 5 }} />
                    <Text
                      style={{
                        marginTop: 5,
                        color: "#fff",
                        marginBottom: 15,
                        fontFamily: "Anuphan-SemiBold",
                      }}
                    >
                      กรณียังไม่ชำระเงิน คนอื่นสามารถซื้อตัดหน้าได้
                    </Text>
                  </View>
                </View>
              </GoldBox>
              <View style={{ margin: 15 }} />
              <Text style={{ fontFamily: "Anuphan-SemiBold" }}>หรือ</Text>
              <View style={{ margin: 15 }} />
              <View style={{ marginBottom: 15 }}>
                <Btn
                  onPress={() => {
                    navigation.dispatch(jumpToHome);
                  }}
                  text="เลือกซื้อลอตเตอรี่ต่อ"
                  iconName="arrow-right"
                  color="#c2c2c2"
                  width={200}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
    color: "#fff",
  },
});
const styles = StyleSheet.create({
  containerRow: {
    width: "100%",
  },
  textHeader: {
    fontSize: 26,
    marginTop: 15,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Anuphan-SemiBold",
  },
  container: {
    flex: 1,
    padding: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Anuphan-SemiBold",
  },
  Title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#0b2760",
    fontWeight: "bold",
    alignItems: "center",
    fontFamily: "Anuphan-SemiBold",
  },
});
