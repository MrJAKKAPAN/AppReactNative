import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Lotteries from '../../../components/Lotteries'

function PendingOrder(props) {
  const { orders, formatComma, LOTTERY_PRICE, navigation } = props;

  const itemCount = orders.pending.reduce((count, order) => {
    return count + order.items.length;
  }, 0);
  return (
 
    <View style={styles.main}>
      <Text style={styles.header}>ลอตเตอรี่ที่รอโอนเงิน</Text>
      <Text style={styles.text}>
        {itemCount} ใบ {formatComma(itemCount * LOTTERY_PRICE)} บาท
      </Text>
      <Text style={styles.text}>ต้องโอนและแจ้งภายใน 30 นาทีหลังซื้อ</Text>
      {orders.pending.map((order, i) => {
        return (
          <View key={i} style={{ width: "100%" }}>
            {/* <Lotteries className={'-all'} showAll lotteries={order.items}></Lotteries> */}
            <Lotteries key={i+"1"} lotteries={order.items}></Lotteries>

            <TouchableOpacity
              onPress={() => navigation.navigate("Payments", {orderId: order.id})}
              style={styles.button}
            >
              <Text style={{ color: "#473707" }}>แจ้งโอนเงิน</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
export default PendingOrder;
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
    marginVertical: 7,
  },
});
