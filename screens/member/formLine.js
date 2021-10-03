import React, { useState, useContext } from "react";
import { WebView } from "react-native-webview";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { AppStateContext } from "../../contexts/AppStateProvider";
import { TabActions } from "@react-navigation/native";
import callApi from "../../assets/api/callApi";
import qs from "qs";
import jwt_decode from "jwt-decode";
import Profile from "./profile";
const clientId = "1655547650";
const clientSecret = "3e7bb1f596191d03828a7a530da40a75";
const scope = "profile%20openid";
const nonce = "kslkslonline5474";
const state = "jkqwdrns";
const redirectUri = "http://localhost:3000/member";
const redirectUrlEncode = encodeURIComponent(redirectUri);
const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrlEncode}&state=${state}&bot_prompt=aggressive&scope=${scope}&nonce=${nonce}`;
const jumpToMember = TabActions.jumpTo("สมาชิก");

function LoginLine(props) {
  const { setShowFormLine, navigation } = props;

  let [showWebView, setShowWebView] = useState(true);
  const context = useContext(AppStateContext);

  const getLineToken = async (lineCode) => {
    let lineResponse = "";
    let res = "";

    const reqBody = {
      grant_type: "authorization_code",
      code: lineCode,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    };

    await fetch("https://api.line.me/oauth2/v2.1/token/", {
      method: "POST",
      body: qs.stringify(reqBody),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => (lineResponse = data))
      .catch((err) => console.log(err));

    const accessToken = lineResponse.access_token;
    const decodedIdToken = jwt_decode(lineResponse.id_token);

    await fetch("https://api.line.me/friendship/v1/status", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => (res = data))
      .catch((err) => console.log(err));
    const lineUser = {
      name: decodedIdToken.name,
      image: decodedIdToken.picture,
      uid: decodedIdToken.sub,
      accessToken,
      isFriend: res.friendFlag === true || res.friendFlag === "true",
    };
    loginWithLine(lineUser);
  };

  const loginWithLine = async (lineUser) => {
    try {
      const result = await callApi({
        url: "/users/login/line",
        body: lineUser,
      });
      await SecureStore.setItemAsync("accessToken", result.accessToken);
      context.setToken(result.accessToken);
      // setToken(result.accessToken);
      const me = await callApi({ url: "/users/me" });
      context.setMe(me);
      setShowFormLine(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onGoBack = () => {
    setShowFormLine(false);
    navigation.dispatch(jumpToMember);
  };

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", left: 10, top: 10, zIndex: 10 }}>
        <TouchableOpacity onPress={onGoBack}>
          <Text style={{ fontSize: 25 }}>X</Text>
        </TouchableOpacity>
      </View>
      {showWebView && (
        <WebView
          source={{ uri: url }}
          originWhitelist={["*"]}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadProgress={({ nativeEvent }) => {
            if (nativeEvent.url.includes("http://localhost:3000/member")) {
              let temp = nativeEvent.url.split("?")[1];
              let tokens = temp.split("&");
              let params = {};
              tokens.map((token) => {
                let pair = token.split("=");
                params[pair[0]] = pair[1];
              });
              getLineToken(params.code);
              setShowWebView(false);
            }
          }}
        />
      )}
    </View>
  );
}
export default LoginLine;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
