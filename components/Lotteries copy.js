////////  game ---> create ////////
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import _, { take, get } from "lodash";
import { CustomText, CustomTextBold } from "../components/CustomText";

import { groupAllLotteries } from "../helpers/lotteries";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ({
  lotteries,
  showAll,
  showScroll,
  prize,
  imageSize = 0.9,
}) {
  // className = '',

  const groupedLotteries = groupAllLotteries(lotteries, prize);

  const [isSeeAll, setIsSeeAll] = useState(false);
  const [activeLottery, setActiveLottery] = useState();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const lotteryWidth = screenWidth * imageSize;

  const cn = (lotteryType) => {
    switch (lotteryType) {
      case "last-two":
        return stylesLottory.labelLastTwo;
      case "first-three":
        return stylesLottory.labelFirstThree;
      case "last-three":
        return stylesLottory.labelLastThree;
      case "series":
        return stylesLottory.labelSeries;
      default:
        break;
    }
  };

  /* คำนวณ marginTopให้เว้นข้างบนให้เห็นเลขแต่ล่ะแพลตฟอร์ม */
  const marginCalculate = (marginValue) => {
    return ((screenHeight / (screenHeight / screenWidth)) * marginValue) / 200;
  };
  let renderCount = 0;
  const renderSeriesLotteries = (
    lotteryGroup,
    { renderOnlyFirstTwo, ignoreFirstTwo }
  ) => {
    const lotteryCount = get(lotteryGroup, "lotteries.length");
    if (lotteryCount > 1) {
      renderCount++;
      if (renderCount <= 2 && ignoreFirstTwo) return <View></View>;
      if (renderCount > 2 && renderOnlyFirstTwo) return <View></View>;

      const displayLotteries = showAll
        ? lotteryGroup.lotteries
        : take(lotteryGroup.lotteries, 5);
      lotteryGroup.lotteries.length;

      return (
        <View
          key={lotteryGroup.id}
          style={{
            marginTop: 5,
            marginBottom: 30 * lotteryGroup.lotteries.length,
          }}
          key={lotteryGroup.number}
        >
          <View
            key={lotteryGroup.id}
            style={[
              stylesLottory.Label,
              {
                backgroundColor: "#f878f1",
                width: lotteryWidth / 4,
                height:
                  lotteryWidth / 2 + 37 * (lotteryGroup.lotteries.length - 1),
              },
            ]}
          >
            <CustomText style={stylesLottory.LableText}>เลขชุด</CustomText>
            <CustomTextBold style={stylesLottory.LableNumber}>
              {" "}
              {lotteryCount}
            </CustomTextBold>
            <CustomText style={stylesLottory.LableText}>ใบ</CustomText>
            <CustomTextBold style={stylesLottory.LableNumber}>
              {lotteryCount * 6}
            </CustomTextBold>
            <CustomText style={stylesLottory.LableText}> ล้าน </CustomText>
          </View>

          <View
            style={[
              {
                width: lotteryWidth,
                height: lotteryWidth / 2,
              },
            ]}
          >
            {displayLotteries.map((lottery, i) => {
              return (
                <Image
                  key={lottery.id}
                  source={{ uri: lottery.image }}
                  style={[
                    stylesLottory.Image,
                    {
                      marginTop: i * marginCalculate(19),
                      /*เว้น marginTop หวยซ้อนกันแล้วให้เห็นเลข */
                      width: lotteryWidth,
                      height: lotteryWidth / 2,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      );
    }
  };

  const renderTypeLotteries = (
    type,
    lotteriesGroup,
    { renderOnlyFirstTwo, ignoreFirstTwo }
  ) => {
    renderCount++;
    if (renderCount <= 2 && ignoreFirstTwo) return <View></View>;
    if (renderCount > 2 && renderOnlyFirstTwo) return <View></View>;

    const displayLotteries = showAll
      ? lotteriesGroup.lotteries
      : take(lotteriesGroup.lotteries, 5);
    return (
      <View
        key={lotteriesGroup.id}
        style={{ marginBottom: 30 * lotteriesGroup.lotteries.length }}
      >
        {lotteriesGroup.lotteries.length > 1 && (
          <View
            style={[
              stylesLottory.Label,
              cn(type),
              isSeeAll
                ? stylesLottory.lottoGroupMore
                : stylesLottory.lottoGroupLess,
              {
                width: lotteryWidth / 4,
                height:
                  lotteryWidth / 2 + 37 * (lotteriesGroup.lotteries.length - 1),
              },
            ]}
          >
            <CustomText style={stylesLottory.LableText}>
              {type === "first-three" ? "เลขหน้า" : "เลขท้าย"}
            </CustomText>
            <CustomTextBold style={stylesLottory.LableNumber}>
              {lotteriesGroup.groupKey}
            </CustomTextBold>
            <CustomText style={stylesLottory.LableText}>จำนวน</CustomText>
            <CustomTextBold style={stylesLottory.LableNumber}>
              {lotteriesGroup.count}
            </CustomTextBold>
            <CustomText style={stylesLottory.LableText}>ใบ</CustomText>
          </View>
        )}
        <View
          key={lotteriesGroup.id + "1"}
          style={[
            {
              width: lotteryWidth,
              height: lotteryWidth / 2,
            },
            isSeeAll
              ? stylesLottory.lottoGroupMore
              : stylesLottory.lottoGroupLess,
          ]}
        >
          {displayLotteries.map((lottery, i) => {
            return (
              <Image
                key={lottery.id}
                source={{ uri: lottery.image }}
                style={[
                  stylesLottory.Image,
                  {
                    marginTop: i * marginCalculate(19),
                    /*เว้น marginTop หวยซ้อนกันแล้วให้เห็นเลข */
                    width: lotteryWidth,
                    height: lotteryWidth / 2,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const resetSerieCount = () => {
    renderCount = 0;
    return;
  };
  const renderSeeMoreBtn = () => {
    if (renderCount <= 2) return <View></View>;
    return (
      <View style={stylesLottory.lottoToggle}>
        <TouchableOpacity onPress={() => setIsSeeAll(!isSeeAll)}>
          {isSeeAll ? (
            <Text style={stylesLottory.btnMoreAndLess}>ดูน้อยลง</Text>
          ) : (
            <Text style={stylesLottory.btnMoreAndLess}>ดูเพิ่มเติม</Text>
          )}
          {/* <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
        </TouchableOpacity>
      </View>
    );
  };

  if (showScroll) {
    return (
      <View>
        {groupedLotteries.series.map((lg) => renderSeriesLotteries(lg, {}))}
        {groupedLotteries.lastThree.map((lg) =>
          renderTypeLotteries("last-three", lg, {})
        )}
        {groupedLotteries.lastTwo.map((lg) =>
          renderTypeLotteries("last-two", lg, {})
        )}
        {groupedLotteries.firstThree.map((lg) =>
          renderTypeLotteries("first-three", lg, {})
        )}
        {groupedLotteries.single.map((singleLottery) =>
          renderTypeLotteries("single", { lotteries: [singleLottery] }, {})
        )}
      </View>
    );
  }

  return (
    <View>
      <View>
        {groupedLotteries.series.map((lg) =>
          renderSeriesLotteries(lg, { renderOnlyFirstTwo: true })
        )}
      </View>

      {groupedLotteries.lastThree.map((lg) =>
        renderTypeLotteries("last-three", lg, { renderOnlyFirstTwo: true })
      )}
      {groupedLotteries.lastTwo.map((lg) =>
        renderTypeLotteries("last-two", lg, { renderOnlyFirstTwo: true })
      )}
      {groupedLotteries.firstThree.map((lg) =>
        renderTypeLotteries("first-three", lg, { renderOnlyFirstTwo: true })
      )}
      {groupedLotteries.single.map((singleLottery) => {
        return renderTypeLotteries(
          "single",
          { lotteries: [singleLottery] },
          { renderOnlyFirstTwo: true }
        );
      })}

      {renderCount > 2 && (
        <View
          style={
            isSeeAll
              ? stylesLottory.lottoGroupsMore
              : stylesLottory.lottoGroupsLess
          }
        >
          {renderSeeMoreBtn()}
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
          {groupedLotteries.single.map((singleLottery) => {
            renderTypeLotteries(
              "single",
              { lotteries: [singleLottery] },
              { ignoreFirstTwo: true }
            );
          })}
        </View>
      )}
    </View>
  );
}

const stylesLottory = StyleSheet.create({
  btnMoreAndLess: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  lottoGroupLess: {
    opacity: 0.5,
  },
  lottoGroupMore: {
    opacity: 1,
  },
  lottoGroupsLess: {
    position: "relative",
    zIndex: 3,
    height: 60,
    overflow: "hidden",
    marginBottom: 0,
    paddingBottom: 30,
  },
  lottoGroupsMore: {
    position: "relative",
    zIndex: 4,
    overflow: "hidden",
    marginBottom: 0,
    paddingBottom: 30,
    maxHeight: 99999,
  },
  lottoToggle: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    // paddingLeft: 4,
    // paddingRight: 4,
    // paddingTop: 11,
    // paddingBottom: 11,
    width: "20%",
    borderWidth: 2,
    borderColor: "#071737",
    backgroundColor: "#eee",
    minWidth: 127,
    color: "#071737",
    borderRadius: 50,
    zIndex: 3,
    left: "60%",
    transform: [
      { translateX: -Dimensions.get("window").width * 0.24 },
      { translateY: Dimensions.get("window").height * 0.01 },
    ],
    // transform: translateX(-50%);
    bottom: 11,
  },
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
  ImageS: {
    flex: 1,
    margin: 0.5,
    width: null,
    borderWidth: 3,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#fff",
    resizeMode: "contain",
  },
  Image: {
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    borderColor: "#fff",
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 2,
  },
  Label: {
    flex: 1,
    padding: 8,
    zIndex: 1,
    margin: 0.5,
    opacity: 0.9,
    borderRadius: 5,
    textAlign: "center",
    position: "absolute",
    alignItems: "center",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
  },
  LableNumber: {
    fontSize: 35,
    marginTop: 5,
    fontWeight: "bold",
    color: "black",
  },
  LableText: {
    color: "black",
    fontSize: 13,
  },
  labelBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    width: "20%",
    height: "100%",
    position: "absolute",
    borderTopStartRadius: 6,
    borderBottomLeftRadius: 6,
  },
  labelLastTwo: {
    backgroundColor: "rgba(255, 184, 0, 0.9)",
  },
  labelFirstThree: {
    backgroundColor: "rgba(0, 240, 255, 0.9)",
  },
  labelLastThree: {
    backgroundColor: "rgba(143, 255, 0, 0.9)",
  },
  labelSeries: {
    backgroundColor: "rgba(255, 94, 239, 0.9)",
  },
});

// Array [
//   Object {
//     "firstThreeDigits": "049",
//     "id": "64-08-01-049811",
//     "image": "https://storage.googleapis.com/kslproject.appspot.com/lotteries/16-02-64/64/08/01/049811.jpg",
//     "isBought": true,
//     "isRotate": false,
//     "lastFiveDigits": "49811",
//     "lastFourDigits": "9811",
//     "lastThreeDigits": "811",
//     "lastTwoDigits": "11",
//     "number": "049811",
//     "roundDate": "16-02-64",
//     "roundNo": "08",
//     "seriesNo": "01",
//     "year": "64",
//   },
//   Object {
//     "firstThreeDigits": "049",
//     "id": "64-08-02-049811",
//     "image": "https://storage.googleapis.com/kslproject.appspot.com/lotteries/16-02-64/64/08/02/049811.jpg",
//     "isBought": true,
//     "isRotate": false,
//     "lastFiveDigits": "49811",
//     "lastFourDigits": "9811",
//     "lastThreeDigits": "811",
//     "lastTwoDigits": "11",
//     "number": "049811",
//     "roundDate": "16-02-64",
//     "roundNo": "08",
//     "seriesNo": "02",
//     "year": "64",
//   },
//   Object {
//     "firstThreeDigits": "616",
//     "id": "64-08-49-616011",
//     "image": "https://storage.googleapis.com/kslproject.appspot.com/lotteries/16-02-64/64/08/49/616011.jpg",
//     "isBought": true,
//     "isHide": false,
//     "isRotate": false,
//     "lastFiveDigits": "16011",
//     "lastFourDigits": "6011",
//     "lastThreeDigits": "011",
//     "lastTwoDigits": "11",
//     "number": "616011",
//     "roundDate": "16-02-64",
//     "roundNo": "08",
//     "seriesNo": "49",
//     "year": "64",
//   },
//   Object {
//     "firstThreeDigits": "854",
//     "id": "64-08-56-854222",
//     "image": "https://storage.googleapis.com/kslproject.appspot.com/lotteries/16-02-64/64/08/56/854222.jpg",
//     "isBought": true,
//     "isRotate": false,
//     "lastFiveDigits": "54222",
//     "lastFourDigits": "4222",
//     "lastThreeDigits": "222",
//     "lastTwoDigits": "22",
//     "number": "854222",
//     "roundDate": "16-02-64",
//     "roundNo": "08",
//     "seriesNo": "56",
//     "year": "64",
//   },
//   Object {
//     "firstThreeDigits": "854",
//     "id": "64-08-57-854222",
//     "image": "https://storage.googleapis.com/kslproject.appspot.com/lotteries/16-02-64/64/08/57/854222.jpg",
//     "isBought": true,
//     "isRotate": false,
//     "lastFiveDigits": "54222",
//     "lastFourDigits": "4222",
//     "lastThreeDigits": "222",
//     "lastTwoDigits": "22",
//     "number": "854222",
//     "roundDate": "16-02-64",
//     "roundNo": "08",
//     "seriesNo": "57",
//     "year": "64",
//   },
// ]
