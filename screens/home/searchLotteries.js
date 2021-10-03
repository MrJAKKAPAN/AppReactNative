import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colorsDark } from "react-native-elements/dist/config";
import RNPickerSelect from "react-native-picker-select";
// import callApi from "../../helpers/callApi";
import callApi from "../../assets/api/callApi";
import BlueBox from "../../components/BlueBox";
import Searchs from "../../components/SearchButton";

function Detail1(props) {
  const { url, query, navigation } = props.route.params;
  const [number, setNumber] = useState("");
  const [lotteries, setLotteries] = useState([]);
  const [threeDigitsSearchType, setThreeDigitsSearchType] =
    useState("last-three");

  useEffect(() => {
    fetchLottery();
  }, [query]);

  const fetchLottery = async () => {
    try {
      const response = await callApi({
        url: url,
        query: query,
      });
      setLotteries(response.results);
    } catch (err) {
      console.log(err);
    }
  };

  const search = () => {
    let url = "";
    let query = "";
    //if --> detail2; else --> detail1
    if (number.length === 2) {
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: "last-two",
        queryAmount: 5,
      });
    } else if (number.length === 3) {
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: threeDigitsSearchType,
        queryAmount: 5,
      });
    } else if (number.length === 6) {
      navigation.navigate("LotteryView", {
        number: number,
        lotteriesType: "series",
        queryAmount: 5,
      });
    } else {
      url = `/lotteries`;
      query = number ? { q: number } : {};
      navigation.navigate("searchLotteries", {
        url: url,
        query: query,
      });
    }
  };

  return (
    <ScrollView style={{ marginTop: 10 }}>
      <View style={{ marginLeft: 5, marginRight: 5 }}>
        <BlueBox>
          <Text style={styles.header}>ค้นหาเลขที่ต้องการ</Text>
          <Text style={styles.title}>
            ค้นได้ทั้งเลขหน้า เลขท้าย หรือทั้งหมด
          </Text>
          <View>
            <Searchs
              onPress={() => search()}
              value={number}
              onChange={(value) => setNumber(value)}
            />
            {number.length === 3 && (
              <View
                style={{
                  marginTop: 1,
                  width: "39%",
                  position: "absolute",
                  left: 139,
                }}
              >
                <RNPickerSelect
                  placeholder={{}}
                  onValueChange={(value) => setThreeDigitsSearchType(value)}
                  items={[
                    { label: "สามตัวท้าย", value: "last-three" },
                    { label: "สามตัวหน้า", value: "first-three" },
                  ]}
                  style={{ padding: 20 }}
                />
              </View>
            )}
          </View>

          <View style={{ marginBottom: 10 }}></View>
        </BlueBox>
      </View>

      <View style={styles.coverSearch}>
        <Text style={{ fontSize: 20 }}>
          ค้นเลข{" > "}
          <Text style={{ fontSize: 30, color: "#d4af37", fontWeight: "bold" }}>
            {query.q}
          </Text>
        </Text>
      </View>

      <View style={styles.coverImg}>
        {lotteries.map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate("LotteryView", {
                  number: v.number,
                  lotteriesType: "series",
                  queryAmount: 5,
                })
              }
            >
              <Image source={{ uri: v.image }} style={styles.img} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Detail1;
const styles = StyleSheet.create({
  blueBox: {
    backgroundColor: "#0092d2",
    width: "100%",
    alignItems: "center",
    marginLeft: 0,
    borderRadius: 5,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    marginBottom: 15,
  },
  coverSearch: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  coverImg: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  img: {
    width: 195,
    height: 100,
  },
});
