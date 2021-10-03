import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import callApi from "../../assets/api/callApi";
import Lotteries from "../lotteries";
function Search({ navigation }) {
  
  const [number, setNumber] = useState(null);
  const search = () => {
    let url = "";
    let query = "";
    if (number.length === 2) {
      url = `/lotteries/carts/last-two/${number}`;
    } else if (number.length === 3) {
      url = `/lotteries/carts/last-three/${number}`;
    } else if (number.length === 6) {
      url = `/lotteries/carts/series/${number}`;
    } else {
      url = `/lotteries`;
      query = number ? { q: number } : {};
    }
    navigation.navigate(query ? "searchLotteries" : "detailLotteries", {
      url: url,
      query: query,
    });
  };

  return (
    <View style={style.main}>
      <TextInput
        onChangeText={(val) => setNumber(val)}
        keyboardType="numeric"
        style={style.input}
      />
      <Button title="ค้นหา" onPress={() => search()} />
    </View>
  );
}

export default Search;

const style = StyleSheet.create({
  main: {
    backgroundColor: "#0092d2",
    width: "100%",
    borderRadius: 3,
    padding: 5,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    height: "35%",
    marginBottom: 5,
    textAlign: "center",
  },
});
