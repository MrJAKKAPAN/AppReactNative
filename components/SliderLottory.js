////////  game ---> create ////////

import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

const SliderLottory = (props) => {
  const {
    images,
    bgColor,
    positionText,
    positionNumber,
    amountText,
    amountNumber,
    blade,
  } = props;
  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{ marginTop: 5 }}
      >
        {images.map((a) => (
          <View style={{ height: 170, width: 320 }} key={a.id}>
            {a.id <= 0 && (
              <View style={[lotto.Label, { backgroundColor: bgColor }]}>
                <Text style={lotto.LableText}>{positionText}</Text>
                <Text style={lotto.LableNumber}>{positionNumber}</Text>
                <Text style={lotto.LableText}>{amountText}</Text>
                <Text style={lotto.LableNumber}>{amountNumber}</Text>
                <Text style={lotto.LableText}> {blade}</Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Image source={{ uri: a.image }} style={lotto.Image} />
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const lotto = StyleSheet.create({
  lottoryTitle: {
    fontSize: 24,
    marginTop: 6,
    color: "#fff",
    fontWeight: "bold",
  },
  lottoryDatail: {
    fontSize: 16,
    marginTop: 6,
    color: "#fff",
  },
  Image: {
    flex: 1,
    margin: 0.5,
    width: null,
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#fff",
    resizeMode: "contain",
  },
  Label: {
    flex: 1,
    padding: 8,
    zIndex: 99,
    margin: 0.5,
    opacity: 0.9,
    borderRadius: 5,
    textAlign: "center",
    position: "absolute",
    alignItems: "center",
    borderTopRightRadius: 0,
    justifyContent: "center",
  },
  LableNumber: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  LableText: {
    fontSize: 10,
  },
});

export default SliderLottory;
