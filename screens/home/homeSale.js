import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import BlueBox from "../../components/BlueBox";
import Searchs from "../../components/SearchButton";
import callApi from "../../helpers/callApi"



function homeSale(props) {
  const [datatest, setData] = React.useState();

  const datatests = [
    {
      id: 0,
      images:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
    {
      id: 1,
      images:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
    {
      id: 2,
      images:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
    {
      id: 3,
      images:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
    {
      id: 4,
      images:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
    {
      id: 5,
      images:
        "https://storage.googleapis.com/kslproject.appspot.com/lotteries/17-01-64/64/03/01/042343.jpg",
    },
  ];

  // console.log(datatests);
  return (
    <View styles={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={{ margin: 8 }} />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#0b2760" }}>
          ลอตเตอรี่ออนไลน์ ซื้อเองง่าย จ่ายโดยรัฐบาล
        </Text>
        <View style={{ margin: 5 }} />
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0092d2" }}>
          ราคา 80 บาท ไม่มีค่าบริการ
        </Text>
        <View style={{ margin: 5 }} />
        <Text style={{ fontSize: 16, color: "#0b2760", fontWeight: "200" }}>
          ลอตเตอรี่งวดวันที่ 16 เมษายน 2564
        </Text>
        <View style={{ margin: 5 }} />

        <BlueBox style={{ padding: 5, margin: 10 }}>
          <View style={{ alignItems: "center" }}>
            <View style={{ margin: 8 }} />
            <Text style={{ fontSize: 28, fontWeight: "bold", color: "#fff" }}>
              ค้นหาเลขเด็ด!
            </Text>
            <View style={{ margin: 5 }} />
            <Text style={{ fontSize: 18, color: "#fff" }}>
              ค้นได้ทั้งเลขหน้า เลขท้าย หรือทั้งหมด
            </Text>
            <View style={{ margin: 10 }} />
            <Searchs />
            <View style={{ margin: 10 }} />
          </View>
        </BlueBox>
      </View>
      {/* box */}
      <View style={{ margin: 5 }} />
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>เลขท้าย 2 ตัวมาแรง!</Text>
        <View style={{ margin: 5 }} />

        <View style={{ flexDirection: "column", flex: 1, borderRadius: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: "100%",
                borderRadius: 5,
              }}
            >
              {datatests.slice(0, 5).map((a) => (
                <View key={a.id}>
                  <Image
                    source={{ uri: a.images }}
                    style={[
                      styles.Image,
                      {
                        marginTop:
                          a.id === 1
                            ? 16
                            : a.id === 2
                            ? 32
                            : a.id === 3
                            ? 48
                            : a.id === 4
                            ? 64
                            : 0,
                      },
                    ]}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, margin: 20 }}>เลขชุด</Text>
            <Text style={{ fontSize: 20, margin: 20 }}>เลขชุด</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, margin: 20 }}>เลขชุด</Text>
            <Text style={{ fontSize: 20, margin: 20 }}>เลขชุด</Text>
          </View> */}
          {/* <View style={{ margin: 5 }}>
            <Text>ดูเลขท้าย 2 ตัวทั้งหมด </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 100,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  Image: {
    resizeMode: "stretch",
    borderRadius: 5,
    width: "50%",
    height: 90,
    alignItems: "center",
    position: "absolute",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default homeSale;
