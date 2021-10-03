import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Lotteries from '../../../components/Lotteries'

function ConfirmedOrder(props) {
  const { orders, formatComma, LOTTERY_PRICE } = props;

  const lotteries = orders.confirmed.reduce((result, order) => {
    return result.concat(order.items);
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.header}>ลอตเตอรี่ที่แจ้งโอนแล้ว</Text>
      <Text style={styles.text}>
        {lotteries.length} ใบ {formatComma(lotteries.length * LOTTERY_PRICE)}{" "}
        บาท
      </Text>
      <Text style={styles.text}>รอยืนยันจากทีมกองสลาก</Text>
      {orders.confirmed.map((order, i) => {
        return (
          <View key={i}>
            <Lotteries showAll lotteries={order.items}></Lotteries>
          </View>
        );
      })}
    </View>
  );
}
export default ConfirmedOrder;
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#0092d2",
    alignItems: "center",
    borderRadius: 3,
    padding: 10,
  },
  header: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    color: "#fff",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#d5ab61",
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginTop: 5,
  },
});
