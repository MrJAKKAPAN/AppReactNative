import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import starSvg from "../../assets/images/star.js";
import * as SecureStore from "expo-secure-store";
import { times, constant, groupBy, map, reduce, get } from "lodash";
import callApi from "../../assets/api/callApi";
import { formatComma, getRoundDateString } from "../../helpers/helpers";
import ThisRoundOrder from "./orders/thisRoundOrder";
import PendingOrder from "./orders/pendingOrder";
import ConfirmedOrder from "./orders/confirmedOrder";
import RequestPrize from "./requestPrize";
import LotteryInSafe from "./LotteryInSafe";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { Chase } from "react-native-animated-spinkit";
import { CustomText, CustomTextBold } from "../../components/CustomText.js";

import { Logs } from "expo";
// import logout from "@line/liff/dist/lib/auth/logout";

function IndexDashBoard({ navigation }) {
  const LOTTERY_PRICE = 80;
  const [webConfig, setWebConfig] = useState([]);
  const [orders, setOrders] = useState({});
  const [isEmptyOrder, setIsEmptyOrder] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [intervalReloadAdditional, setIntervalReloadAdditional] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [prizeCount, setPrizeCount] = useState();
  const [prizes, setPrizes] = useState();
  const context = useContext(AppStateContext);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    if (orders && orders.confirmed && orders.confirmed.length > 0) {
      const intervalTime = 30000;
      setTimeout(async () => {
        if (orders && orders.confirmed && orders.confirmed.length > 0) {
          setIntervalReloadAdditional(
            intervalTime + intervalReloadAdditional * 2
          );
          await Promise.all([
            fetchOrders(),
            fetchPrizes(),
            fetchShowResult(),
            getWebConfig(),
          ]);
        }
      }, intervalTime + intervalReloadAdditional);
    }
  }, []);

  let stillMounted = { value: false };
  useEffect(() => {
    stillMounted.value = true;
    return () => (stillMounted.value = false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // if (!context.me) {
      //   navigation.navigate("สมาชิก");
      // }
      setIsLoading(true);
      Promise.all([
        fetchOrders(),
        fetchPrizes(),
        fetchShowResult(),
        getWebConfig(),
      ]).finally(() => {
        setIsLoading(false);
      });
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    fetchOrders().finally(() => setIsLoading(false));
  }, []);

  const getWebConfig = async () => {
    try {
      const webConfig = await callApi({ url: "/contents/configs" });
      setWebConfig(webConfig);
    } catch (e) {
      console.log(e);
    }
  };

  let roundDate = "";
  if (webConfig.lastRoundDate) {
    roundDate = getRoundDateString(webConfig.lastRoundDate);
  }

  const fetchShowResult = async () => {
    try {
      const _showResult = await callApi({
        url: "/contents/show-result",
      });
      if (_showResult) {
        setShowResult(_showResult.value);
      }
      
    } catch (err) {
      setIsEmptyPrize(true);
      setPrizeCount(0);
      console.log(err);
    }
  };

  const fetchPrizes = async () => {
    try {
      const _prizes = await callApi({
        url: "/users/me/prizes",
      });
      if (_prizes) {
        const prizeGroupByType = groupBy(_prizes.results, "name");
        setPrizes(prizeGroupByType);
        setPrizeCount(_prizes.results.length);
      }
    } catch (err) {
      setIsEmptyPrize(true);
      setPrizeCount(0);
      console.log(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const _orders = await callApi({
        url: "/users/me/orders",
      });
      if (get(_orders, "results.length") > 0) {
        const orderGroupByStatus = groupBy(_orders.results, "status");
        setOrders(orderGroupByStatus);
        return orderGroupByStatus;
      } else {
        setIsEmptyOrder(true);
        setTimeout(() => {
          if (stillMounted.value) {
            navigation.navigate("หน้าหลัก");
          }
        }, 30000);
        return null;
      }
    } catch (err) {
      setIsEmptyOrder(true);
      setTimeout(() => {
        if (stillMounted.value) {
          navigation.navigate("หน้าหลัก");
        }
      }, 30000);
      console.log(err);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    context.setToken(null);
    context.setMe("");
    navigation.navigate("หน้าหลัก");
  };

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "#ffff",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomText style={{ fontSize: 20 }}>Loading......</CustomText>
        <Chase size={100} color="#edcf85" />
      </View>
    );
  }

  if (!context.me) {
    return (
      // <View></View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("สมาชิก")}
            style={{
              backgroundColor: "#0092d2",
              marginTop: 10,
              width: "80%",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
            }}
          >
            <Text style={{ color: "#fff" }}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  if (context.me) {
    return (
      <ScrollView
        style={{ width: "100%", minHeight: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ padding: 7 }}>
          <View style={{ alignItems: "center" }}>
            <CustomText
              style={{
                color: "#0b2760",
                fontSize: 23,
                fontWeight: "bold",
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              ตู้เซฟ {""}คุณ {context.me.firstName} {context.me.lastName}
            </CustomText>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CustomText>
                <SvgXml xml={starSvg} style={{ color: "#0b2760" }} />
              </CustomText>
              <CustomText style={{ color: "#0b2760" }}>
                {" "}
                รหัสสมาชิก: {context.me.userId}
              </CustomText>
            </View>
            {context.me.phone ||
              (context.me.phoneContact && (
                <CustomText style={{ color: "#0b2760" }}>
                  <Feather name="phone" style={{ fontSize: 18 }} /> โทร:{" "}
                  {context.me.phone
                    ? context.me.phone
                    : context.me.phoneContact}
                </CustomText>
              ))}
          </View>

          {showResult && prizeCount > 0 && (
            <RequestPrize prizes={prizes} roundDate={roundDate} />
          )}

          {orders.pending && (
            <PendingOrder
              orders={orders}
              formatComma={formatComma}
              LOTTERY_PRICE={LOTTERY_PRICE}
              navigation={navigation}
            />
          )}
          <CustomText />
          {orders.success && (
            <ThisRoundOrder
              roundDate={roundDate}
              orders={orders}
              webConfig={webConfig}
              setIsEmptyOrder={setIsEmptyOrder}
            />
          )}
          <CustomText />
          {orders.confirmed && (
            <ConfirmedOrder
              orders={orders}
              formatComma={formatComma}
              LOTTERY_PRICE={LOTTERY_PRICE}
            />
          )}

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate("cart", {})}
              style={styles.button}
            >
              <CustomText onPress={() => logout()} style={{ color: "#071737" }}>
                ออกจากระบบ
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* <RequestPrize /> */}
          {/* <LotteryInSafe/> */}
        </View>
      </ScrollView>
    );
  }
}
export default IndexDashBoard;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c2c2c2",
    width: "40%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginTop: 5,
  },
});
