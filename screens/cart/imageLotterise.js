import React, { useState } from "react";
import { take, get } from "lodash";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import { groupAllLotteries } from "../../helpers/lotteries";

export default function ({ lotteries, showAll, prize }) {
 
  const groupedLotteries = groupAllLotteries(lotteries, prize);

  const [isSeeAll, setIsSeeAll] = useState(false);
  const [activeLottery, setActiveLottery] = useState();

  // เลขชุด
  let renderCount = 0;
  const renderSeriesLotteries = (
    lotteryGroup,
    { renderOnlyFirstTwo, ignoreFirstTwo }
  ) => {
    const lotteryCount = get(lotteryGroup, "lotteries.length");
    if (lotteryCount > 1) {
      renderCount++;
      if (renderCount <= 2 && ignoreFirstTwo) return;
      if (renderCount > 2 && renderOnlyFirstTwo) return;

      const displayLotteries = showAll
        ? lotteryGroup.lotteries
        : take(lotteryGroup.lotteries, 5);
      return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          style={{ marginTop: 5 }}
          key={lotteryGroup.number}
        >
          <View style={[stylesLottory.Label, { backgroundColor: "#FF77F1" }]}>
            <Text style={stylesLottory.LableText}>เลขชุด</Text>
            <Text style={stylesLottory.LableNumber}> {lotteryCount}</Text>
            <Text style={stylesLottory.LableText}>ใบ</Text>
            <Text style={stylesLottory.LableNumber}>{lotteryCount * 6}</Text>
            <Text style={stylesLottory.LableText}> ล้าน </Text>
          </View>

          {displayLotteries.map((lottery, i) => {
            return (
              <View style={{ height: 180, width: 340 }} key={i}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: lottery.image }}
                    style={stylesLottory.Image}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    }
    return;
  };

  // หวยเลขท้ายหรือ ใบเดี่ยว
  const renderTypeLotteries = (
    type,
    lotteriesGroup,
    { renderOnlyFirstTwo, ignoreFirstTwo }
  ) => {
    renderCount++;
    if (renderCount <= 2 && ignoreFirstTwo) return;
    if (renderCount > 2 && renderOnlyFirstTwo) return;

    const displayLotteries = showAll
      ? lotteriesGroup.lotteries
      : take(lotteriesGroup.lotteries, 5);
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{ marginTop: 5 }}
        key={lotteriesGroup.lotteries[0].id}
      >
        {lotteriesGroup.lotteries.length > 1 && (
          <View
            style={[
              stylesLottory.Label,
              {
                backgroundColor:
                  type === "last-two"
                    ? "#FDC64E"
                    : "last-three"
                    ? "#A5FD55"
                    : "first-three"
                    ? "#5EF0FD"
                    : "#5EF0FD",
              },
            ]}
            key={lotteriesGroup.id}
          >
            <Text style={stylesLottory.LableText}>
              {type === "first-three" ? "เลขหน้า" : "เลขท้าย"}
            </Text>
            <Text style={stylesLottory.LableNumber}>
              {lotteriesGroup.groupKey}
            </Text>
            <Text style={stylesLottory.LableText}>จำนวน</Text>
            <Text style={stylesLottory.LableNumber}>
              {lotteriesGroup.count}
            </Text>
            <Text style={stylesLottory.LableText}>ใบ</Text>
          </View>
        )}
        {lotteriesGroup.lotteries &&
          displayLotteries.map((lottery, i) => {
            return (
              <View style={{ height: 170, width: 340 }} key={i}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: lottery.image }}
                    style={stylesLottory.Image}
                  />
                </View>
              </View>
            );
          })}
      </ScrollView>
    );
  };

  const resetSerieCount = () => {
    renderCount = 0;
    return;
  };

  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{ marginTop: 2 }}
      >
        {groupedLotteries.series.map((lg) =>
          renderSeriesLotteries(lg, { renderOnlyFirstTwo: true })
        )}
        {groupedLotteries.lastThree.map((lg) =>
          renderTypeLotteries("last-three", lg, { renderOnlyFirstTwo: true })
        )}
        {groupedLotteries.lastTwo.map((lg) =>
          renderTypeLotteries("last-two", lg, { renderOnlyFirstTwo: true })
        )}
        {groupedLotteries.firstThree.map((lg) =>
          renderTypeLotteries("first-three", lg, { renderOnlyFirstTwo: true })
        )}
        {groupedLotteries.single.map((singleLottery) =>
          renderTypeLotteries(
            "single",
            { lotteries: [singleLottery] },
            { renderOnlyFirstTwo: true }
          )
        )}

        {renderCount > 2 && (
          <>
            {resetSerieCount()}
            {groupedLotteries.series.map((lg) =>
              renderSeriesLotteries(lg, { ignoreFirstTwo: true })
            )}
            {groupedLotteries.lastThree.map((lg) =>
              renderTypeLotteries("last-three", lg, { ignoreFirstTwo: true })
            )}
            {groupedLotteries.lastTwo.map((lg) =>
              renderTypeLotteries("last-two", lg, { ignoreFirstTwo: true })
            )}
            {groupedLotteries.firstThree.map((lg) =>
              renderTypeLotteries("first-three", lg, { ignoreFirstTwo: true })
            )}
            {groupedLotteries.single.map((singleLottery) =>
              renderTypeLotteries(
                "single",
                { lotteries: [singleLottery] },
                { ignoreFirstTwo: true }
              )
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}

const stylesLottory = StyleSheet.create({
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
    resizeMode: "cover",
  },
  Label: {
    flex: 1,
    padding: 8,
    zIndex: 99,
    margin: 0.5,
    opacity: 0.99,
    borderRadius: 5,
    textAlign: "center",
    position: "absolute",
    alignItems: "center",
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
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
