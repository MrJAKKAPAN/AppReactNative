import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function Time(props) {
  const { initialMinute = 0, initialSeconds = 0, onExpired } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [alreadyCallExpired, setAlreadyCallExpired] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (minutes < 0 || seconds < 0 || (minutes === 0 && seconds === 0)) {
        clearInterval(myInterval);
        setMinutes(0);
        setSeconds(0);
        if (!alreadyCallExpired) {
          setAlreadyCallExpired(true);
          onExpired();
        }

        return;
      } else if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (seconds === 0) {
        if (minutes < 0) {
          clearInterval(myInterval);
          if (onExpired) {
            onExpired();
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <>
      {minutes === 0 && seconds === 0 ? (
        <Text style={styles.TextColor}>
          <Text>0:00 </Text>นาที
        </Text>
      ) : (
        <Text style={styles.TextColor}>
          <Text>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Text>{" "}
          นาที
        </Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  TextColor: {
    color: "#fff",
    fontSize: 24,
  },
});
