import React from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import Buttonss from "../../components/BtnGrey";
import UnderLine from "../../components/UnderLine";

const BlogLottery = (props) => {
  return (
    <View style={stylesLottory.lottoryBox}>
      <View style={{ marginBottom: 5 }} />
      <View>
        {props.images.map((a) => (
          <View
            style={{ height: 200, width: Platform.OS == "ios" ? 340 : 360 }}
            key={a.id}
          >
            {a.id === 1 ? (
              <View style={stylesLottory.Label}>
                <Text style={stylesLottory.LableText}>
                  {props.positionText}
                </Text>
                <Text style={stylesLottory.LableNumber}>
                  {props.positionNumber}
                </Text>
                <Text style={stylesLottory.LableText}>{props.amountText}</Text>
                <Text style={stylesLottory.LableNumber}>
                  {props.amountNumber}
                </Text>
                <Text style={stylesLottory.LableText}> {props.blade}</Text>
              </View>
            ) : (
              <View></View>
            )}
            <View style={{ flex: 1 }}>
              <Image source={{ uri: a.image }} style={stylesLottory.Image} />
            </View>
          </View>
        ))}
      </View>
      <UnderLine margin={8} />
      <View style={{ width: "100%" }}>
        <Buttonss
          onPress={props.onPressConfriment}
          text="แจ้งโอนเงิน"
          color="#fbe599"
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
};

const stylesLottory = StyleSheet.create({
  lottoryBox: {
    padding: 8,
    width: "100%",
    color: "#fff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  lottoryTitle: {
    fontSize: 24,
    marginTop: 8,
    color: "#fff",
    fontWeight: "bold",
  },
  lottoryDatail: {
    margin: 6,
    fontSize: 16,
    color: "#fff",
  },
  Image: {
    flex: 1,
    width: null,
    height: null,
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: "cover",
    borderColor: "#fff",
  },
  Label: {
    flex: 1,
    padding: 8,
    zIndex: 99,
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",
    position: "absolute",
    borderTopRightRadius: 0,
    justifyContent: "center",
    backgroundColor: "#f5c765",
  },
  LableNumber: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "bold",
  },
  LableText: {
    fontSize: 10,
  },
});

export default BlogLottery;
