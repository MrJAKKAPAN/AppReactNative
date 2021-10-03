import React, { useEffect, useState, useRef } from "react";
import { TabActions, useFocusEffect } from "@react-navigation/native";
import {
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";

const TimeText12 = (props) => {
  const [fedeProps, setFadeProp] = useState(true);

  useEffect(() => {
    const timeout = setInterval(() => {
      if (fedeProps) {
        setFadeProp(false);
      } else if (!fedeProps) {
        setFadeProp(true);
      } else {
        setFadeProp(false);
      }
    }, 580);
    return () => {
      clearInterval(timeout);
    };
  }, [fedeProps]);

  return (
    <>
      {fedeProps ? (
        <Text style={styles.textHeader}>
          รางวัลสูงสุด{" "}
          <Text style={{ fontSize: 32 }}>{props.maxCount * 6}</Text> ล้านบาท
        </Text>
      ) : (
        <Text style={styles.textHeaders}>
        รางวัลสูงสุด{" "}
        <Text style={{ fontSize: 32 }}>{props.maxCount * 6}</Text> ล้านบาท
      </Text>
      )}
    </>
  );
};

TimeText12.defaultProps = {
  text: "รางวัลสูงสุด 12 ล้านบาท",
};

TimeText12.propTypes = {
  text: PropTypes.string,
};

const styles = StyleSheet.create({
    textHeader: {
      fontSize: 26,
      marginTop: 15,
      color: "#fff",
      fontWeight: "bold",
      fontFamily: "Anuphan-SemiBold",
    },
    textHeaders: {
        opacity: 0,
        fontSize: 26,
        marginTop: 15,
        color: "#fff",
        fontWeight: "bold",
        fontFamily: "Anuphan-SemiBold",
      },
  });
  

export default TimeText12;
