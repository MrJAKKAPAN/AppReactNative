import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { CustomText,CustomTextBold } from "./CustomText";

const TextRow = (props) => {
  const {onPress, lotteriesType, IconImgage, Color, Price, Number, Count, fontWeight, Amount } = props;
  const [statusIcon, setStatusIcon] = useState(props.statusIcon);
  return (
    <>
      {statusIcon ? (
        <>
          <View style={{ flexDirection: "row", margin: 2 }}>
            <TouchableOpacity onPress={onPress}>
              {lotteriesType !== "series" ? (
                <Image
                  source={IconImgage}
                  style={{
                    width: 16,
                    height: 16,
                    marginTop: 6,
                    marginEnd: 7,
                    borderColor: "#a2a8b4",
                    borderWidth: 1.5,
                    borderRadius: 8,
                    backgroundColor: "#fff",
                  }}
                  onPress={onPress}
                />
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: 2,
                justifyContent: "space-between",
                width: Platform.OS === "ios" ? "90%" : "90%",
              }}
            >
              <View>
                <CustomText
                  style={{
                    fontSize: 18,
                    // fontFamily:"Anuphan-regular",
                    color: Color,
                    fontWeight: fontWeight,
                  }}
                >
                  {Number} {Count > 1 && "(เลขชุด)"}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: lotteriesType !== "series" ? "43%" : "37.7%",
                  marginTop: -2,
                }}
              >
                <View>
                  <CustomText
                    style={{
                      fontSize: 18,
                      color: Color,
                      fontWeight: fontWeight,
                    }}
                  >
                    {Amount} ใบ
                  </CustomText>
                </View>
                <View>
                  <CustomText
                    style={{
                      fontSize: 18,
                      color: Color,
                      fontWeight: fontWeight,
                      paddingLeft: lotteriesType !== "series " ? 34 : null,
                    }}
                  >
                    {Price} บาท
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{ flexDirection: "row", margin: 2 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 2,
                justifyContent: "space-between",
                width: Platform.OS === "ios" ? "90%" : "90%",
              }}
            >
              <View>
                <CustomText
                  style={{
                    fontSize: 18,
                    color: Color,
                    fontWeight: fontWeight,
                  }}
                >
                  {Number} {Count > 1 && "(เลขชุด)"}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "45%",
                  marginTop: -2,
                }}
              >
                <View>
                  <CustomText
                    style={{
                      fontSize: 18,
                      color: Color,
                      fontWeight: fontWeight,
                    }}
                  >
                    {Amount} ใบ
                  </CustomText>
                </View>
                <View>
                  <CustomText
                    style={{
                      fontSize: 18,
                      color: Color,
                      fontWeight: fontWeight,
                    }}
                  >
                    {Price} บาท
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerRow: { flexDirection: "row", margin: 3 },
  Image: { width: 16, height: 16, marginTop: 6, marginEnd: 7 },
  BlockTextSmall: {
    width: "45%",
    marginTop: -2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  BlockText: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Platform.OS === "ios" ? "90%" : "80%",
  },
});

export default TextRow;
