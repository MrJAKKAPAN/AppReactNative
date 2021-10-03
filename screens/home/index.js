import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import screenSize from "../screenSize";
import SoldOut from "./soldOut/soldOut";
import IndexSale from "./sale/indexSale";
import IndexHomeCountDown from "./countdown/indexCountdown";
import ViewLottery from "./lotteryView";
import SplasScreen from "../splash/splasScreen";
import Load from "../../helpers/load";
import Search from "./search";
import AppLoading from "expo-app-loading";
import { set } from "lodash";
import { CustomText } from "../../components/CustomText";
// import * as SplashScreen from 'expo-splash-screen';

import { Chase } from "react-native-animated-spinkit";

function App({ route, navigation }) {
  const widthScreen = Dimensions.get("screen").width;
  const heightScreen = Dimensions.get("window").height;
  const [lottery, setLottery] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRoundClosed, setIsRoundClosed] = useState(false);
  const [config, setConfig] = useState();

  let i = 0;
  let url =
    Platform.OS === "android"
      ? "https://us-central1-kslstaging.cloudfunctions.net/api/v1//contents/configs/"
      : "https://us-central1-kslstaging.cloudfunctions.net/api/v1//contents/configs/";

  const fecthConfig = async () => {
    try {
      let result = await fetch(url);
      const data = await result.json();
      if (data) {
        setConfig(data);
        setIsRoundClosed(data.isRoundClosed);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthConfig()
      // .then((data) =>  data))
      // .then(() => setIsRoundClosed())
      .catch((error) => console.log(error));
    setIsLoading(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      if (isActive) {
        fecthConfig()
          .then((data) => data)
          .catch((error) => console.log(error));
      }
      setIsLoading(false);

      return () => {
        isActive = false;
      };
    }, [])
  );
  if (isLoading) {
    return (
      <View style={{ backgroundColor: "skyblue", height: "100%" }}>
        <Text>
          <Text> Now Loading ....... </Text>
        </Text>
      </View>
    );
  }

  if (config && isRoundClosed) {
    return (
      <View style={styles.container}>
        <IndexHomeCountDown webConfig={config} />
      </View>
    );
  }
  if (config) {
    return (
      <View style={styles.container}>
        <IndexSale navigation={navigation} route={route} webConfig={config} />
      </View>
    );
  }
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
  rr;
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default App;
