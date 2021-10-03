import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CountdownRound from "./countdownRound";
import ShowWinningNumber from "./showWinningBox";
import CloseRound from "./closeRoundBox";
import callApi from "../../../helpers/callApi";
import { Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function IndexCountDown({ webConfig }) {

  const [isCloseRound, setIsCloseRound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prize, setPrize] = useState();
  const lastRoundDate_ = webConfig.lastRoundDate;
  let controller = new AbortController();
  // let signal = controller.signal;

  const fecthPrize = async () => {

    try {
      let result = await fetch(
        Platform.OS === "android"
          ? `http://10.0.2.2:5001/kslproject/asia-east2/api/v1/prizes/rounds/${lastRoundDate_}/annoucement`
          : `http://localhost:5001/kslproject/asia-east2/api/v1/prizes/rounds/${lastRoundDate_}/annoucement`,
          {signal:controller.signal}
      );
      let data = await result.json();
      setPrize(data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fecthPrize()
    return ()=> {
      
      controller.abort()
    }
  }, [webConfig]);

  if (isLoading) {
    return (
      <View style={{ backgroundColor: "skyblue", height: "100%" }}>
        <Text> Now Loading . . . . . . . . . . .</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <CountdownRound webConfig={webConfig} />
      {!webConfig && prize.first ? (
        <ShowWinningNumber prize={prize} webConfig={webConfig} />
      ) : (
        <CloseRound />
      )}
    </ScrollView>
  );
}


export default IndexCountDown;
