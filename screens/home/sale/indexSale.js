import React, { useState, useEffect, useCallback } from "react";
import { View, Text, RefreshControl, ScrollView } from "react-native";
import SearchBox from "./searchBox";
import LotteryList from "./lotteryList";
import SoldOut from "../../home/soldOut/soldOut";
import { resolve } from "url";
import { Chase } from "react-native-animated-spinkit";
import { useFocusEffect } from "@react-navigation/native";
import { CustomText, CustomTextBold } from "../../../components/CustomText";

export default function indexSale({ route, navigation, webConfig }) {
  const [isLoading, setAppLoading] = useState(true);
  const [displaySoldOut, setDisplaySoldout] = useState();
  const [lotteries, setLotteries] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshLottery, setRefreshLottery] = useState(false);
  const [focusLoading, setFocusLoading] = useState(false);

  let url =
    Platform.OS === "android"
      ? "https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/home/"
      : "https://us-central1-kslstaging.cloudfunctions.net/api/v1/lotteries/home/";

  const fetchLotterySoldOut = async () => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data) {
        setLotteries(data);
        let lottoSoldout = true;
        data.series.forEach((lottoGroup) => {
          if (lottoGroup.count > 0) {
            lottoSoldout = false;
          }
        });
        data.twoDigits.forEach((lottoGroup) => {
          if (lottoGroup.count > 0) {
            lottoSoldout = false;
          }
        });
        data.firstThreeDigits.forEach((lottoGroup) => {
          if (lottoGroup.count > 0) {
            lottoSoldout = false;
          }
        });
        data.threeDigits.forEach((lottoGroup) => {
          if (lottoGroup.count > 0) {
            lottoSoldout = false;
          }
        });
        setDisplaySoldout(lottoSoldout);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchLotterySoldOut()
        .then(() => {
          return true;
        })
        .catch((error) => console.log("from errrror", error));
    }
    setAppLoading(false);
    return () => {
      mounted = false;
    };
  }, []);
  const wait = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  useFocusEffect(
    React.useCallback(() => {
      setRefreshing(true);
      fetchLotterySoldOut()
      .then(()=>{setRefreshLottery(!refreshLottery);})
      .finally(()=>setRefreshing(false));
      
      return () => {
        console.log("refreshing indexSale in return focusEffect", refreshing);
      };
    }, [isLoading])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setAppLoading(true);
    
    setRefreshLottery(!refreshLottery);
    fetchLotterySoldOut()
    .then(() => {
      return setAppLoading(false), setRefreshing(false);
    });
  };

  if (isLoading) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#3192d2",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomTextBold>Loading</CustomTextBold>
        <Chase size={100} color="#edcf85" />
      </View>
    );
  }

  if (displaySoldOut) {
    return <SoldOut />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SearchBox webConfig={webConfig} navigation={navigation} route={route} />
      <LotteryList
        navigation={navigation}
        route={route}
        refreshLottery={refreshLottery}
        webConfig={webConfig}
      />
    </ScrollView>
  );
}
