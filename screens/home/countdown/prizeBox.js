import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTextBlue, CustomText } from "../../../components/CustomText";
import Svg, { Polygon, Text as SvgText, TextPath } from "react-native-svg";
import { Platform } from "react-native";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

export const PrizeBox = ({
  prizeName = "รางวัลที่",
  winningNumber = "xxxxxx",
  style,
}) => {
  return (
    <View style={[{ width: "100%" }, style]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.25 }}
        locations={[0, 1]}
        colors={["#5cbae2", "#3ba7ef"]}
        style={[styles.blueBoxHead]}
      >
        <CustomText style={styles.textPrizeName}>{prizeName}</CustomText>
        <View style={[styles.whiteBox, style]}>
          <Text style={[styles.textFirstPrize, style]}>{winningNumber}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};
export const PrizeLastTwoBox = ({
  prizeName = "รางวัลที่",
  winningNumber = "xx",
  style,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.25 }}
        locations={[0, 1]}
        colors={["#5cbae2", "#3ba7ef"]}
        style={[styles.blueBoxHead,{height:"100%"}]}
      >
        <CustomText style={styles.textPrizeName}>{prizeName}</CustomText>
        <View
        style={[
          styles.whiteBox,
          { flex: 1 },
          Platform.OS === "ios" ? { paddingEnd: 9 } : { paddingEnd: 14 },
        ]}
      > 
      {/* <View style={{width:"100%",height:"50%",backgroundColor:"r'rgba(255, 5, 5, 0.1)'",position:"absolute",top:1,right:0,left:5,bottom:1 ,zIndex:100}}></View> */}
        <Text style={[styles.textFirstPrize, style]}>{winningNumber}</Text>
      </View>
      </LinearGradient>
   
    </View>
  );
};

export const PrizeThreeBox = ({
  prizeName = "รางวัล",
  winningNumber = ["xxx", "xxx"],
  style,
}) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <LinearGradient
        style={[styles.blueBoxHead]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.25 }}
        locations={[0, 1]}
        colors={["#5cbae2", "#3ba7ef"]}
      >
        <CustomText>{prizeName}</CustomText>
        <View
        style={[
          styles.whiteBoxPrizeThree,
          { paddingVertical: 0 },
          Platform.OS === "ios" ? {} : { paddingEnd: 5 },
          style,
        ]}
      >
        <View>
          <Text style={[styles.textThreePrize]}>{winningNumber[0]}</Text>
        </View>

        {/*เส้นแบ่งครึ่งกล่องสามตัว */}
        <Svg
          style={{
            alignSelf: "center",
            height: "100%",
            backgroundColor: "#3ba7ef",
          }}
          width={1}
          backgroundColor="#3ba7ef"
        />
        {/*เส้นแบ่งครึ่งกล่องสามตัว */}

        <View>
          <Text style={[styles.textThreePrize]}>{winningNumber[1]}</Text>
        </View>
      </View>
      </LinearGradient>

      
    </View>
  );
};

const styles = StyleSheet.create({
  blueBoxHead: {
    padding: 0,
    backgroundColor: "red",
    borderRadius: 8,
    borderRadius: 8,

    alignItems: "center",
  },

  containPrizeThee: {
    flexDirection: "row",
  },
  whiteBox: {
    borderWidth: 1,
    borderColor: "#0092d2",
    backgroundColor: "#ffff",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  whiteBoxPrizeThree: {
    paddingStart: 8,
    backgroundColor: "#ffff",
    flexDirection: "row",
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    borderColor: "#0092d2",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textPrizeName: {
    fontSize: 20,
    margin: 3,
    
  },
  textFirstPrize: {
    marginStart: 12,
    fontSize: 50,
    fontFamily: "Oswald-SemiBold",
    letterSpacing: 20,
    textAlign: "center",
    color: "#c79c52",
  },
  textThreePrize: {
    margin: 5,
    fontSize: 30,
    fontFamily: "Oswald-SemiBold",
    letterSpacing: 5,
    color: "#0b2760",
    textAlign: "center",
  },
});
