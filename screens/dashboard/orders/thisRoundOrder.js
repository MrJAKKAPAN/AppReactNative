import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Lotteries from "../../../components/Lotteries";
import callApi from "../../../assets/api/callApi";
import * as WebBrowser from "expo-web-browser";

function ThisRoundOrder(props) {
  const { roundDate, orders, webConfig, setIsEmptyOrder } = props;

  return (
    <View style={styles.main}>
      <Text style={styles.header}>ลอตเตอรี่ที่ซื้อแล้ว เก็บในตู้เซฟ</Text>
      <Text style={styles.text}>งวดวันที่ {roundDate}</Text>

      <View>
        {orders.success &&
          orders.success.map((order, i) => {
            return (
              <View key={i}>
                <Lotteries
                  showAllz
                  lotteries={order.items}
                ></Lotteries>
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            );
          })}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#364e92",
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
          width: "100%",
          height: 40,
          borderRadius: 3,
        }}
        onPress={async () => {
          try {
            const { shareId } = await callApi({
              url: "/share",
              body: { roundDate: webConfig.roundDate },
            });

            if (shareId) {
              await WebBrowser.openBrowserAsync(
                `https://www.facebook.com/dialog/share?app_id=443674120073083&href=https://กองสลาก.com/facebook/${shareId}&redirect_uri=https://กองสลาก.com/social/${shareId}`
              );
            } else {
              return alert("พบข้อผิดพลาดในระบบโปรดลองใหม่ภายหลัง11111");
            }
          } catch (err) {
            console.log(err);
            return alert("พบข้อผิดพลาดโปรดลองใหม่ภายหลัง22222");
          }
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#364e92",
          }}
          source={{
            uri: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png",
          }}
        />
        <View
          style={{
            marginLeft: 3,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderLeftWidth: 0.5,
            borderLeftColor: "#000066",
          }}
        ></View>
        <Text
          style={{
            color: "#fff",
            width: "50%",
            textAlign: "center",
          }}
        >
          แชร์บนเฟสบุ๊ค
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default ThisRoundOrder;
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0092d2",
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
    padding: 10,
  },
  header: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
  },
});
