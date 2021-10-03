import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CustomText,
  CustomTextBlue,
  CustomTextBold,
} from "../../../components/CustomText";
import moment from "moment";
import "moment/locale/th";
import {getRoundDateString} from '../../../helpers/helperDateFormat'


const monthNameTH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];


const CountDownRound = ({ webConfig}) => {
  const dueDayFromConfig = setDateFormat(
    webConfig.nextRound || "Jan 1, 2021 00:00:00 UTC+0700"

  );
  const defaultDay1 = 5;
  const defaultDay2 = 20;
  const defaultHour = 23;
  const defaultMinute = 7;
  const defaultSecond = 7;
  const _7Hours = 25200000;

    

  const [coundownTimer, setCountdownTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 1,
  });
  const dateNow = new Date();
  const dateEnd = getValidAvailableTime(); //new Date(nextAvailableLottoDate);

  const stringDateEnd =
    dateEnd.getDate() +
    " " +
    monthNameTH[dateEnd.getMonth()] +
    " " +
    dateEnd.getFullYear() +
    " เวลา " +
    dateEnd.toLocaleTimeString("en-GB");

  const [diffSec, setDiffSec] = useState(
    dateEnd.valueOf() - dateNow.valueOf() 
  ); //Manipurate to UTC+0 time

  const RoundDate = getRoundDateString(webConfig.lastRoundDate)

  function getValidAvailableTime() {
    let configDate = isFinite(Date.parse(dueDayFromConfig))
      ? Date.parse(dueDayFromConfig)
      : 0; // in case of dueDayFromConfig is wrong format
    if (configDate - dateNow.valueOf() > 0) {
      return new Date(configDate);
    } else {
      let dueTime1 = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        defaultDay1,
        defaultHour,
        defaultMinute,
        defaultSecond
      );
      let dueTime2 = new Date(
        dateNow.getFullYear(),
        dateNow.getMonth(),
        defaultDay2,
        defaultHour,
        defaultMinute,
        defaultSecond
      );

      let dateNowVal = dateNow.valueOf();
      if (dateNowVal < dueTime1.valueOf()) {
        return dueTime1;
      } else if (dateNowVal < dueTime2.valueOf()) {
        return dueTime2;
      } else {
        dueTime1.setMonth(dueTime1.getMonth() + 1);
        return dueTime1;
      }
    }
  }

  // console.log(moment().format('LLL'));
  const timeToSale = moment().format("LLL").slice(-0, -10);


  function setDateFormat(dateString) {
    //from DD-MM-YY hh:mm to YYYY-MM-DDThh:mm:00
    if (dateString.length === 14 && dateString.split(" ").length === 2) {
      let [date, time] = dateString.split(" ");
      date = date.split("-");
      return (
        "20" + date[2] + "-" + date[1] + "-" + date[0] + "T" + time + ":00"
      );
    } else {
      return "70-01-01"; // 1 jan 1970
    }
  }

  useEffect(() => {
    // get in this effect to setTime after the next render that complete load value from config and setState to dueDayFromConfig
    setDiffSec(dateEnd.valueOf() - dateNow.valueOf() - _7Hours);
  }, [dueDayFromConfig]);

  const setTimeCountdown = () => {
    const now = new Date(diffSec);
    if (dateEnd < now) {
      setCountdownTimer({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    } else {
      setCountdownTimer({
        days: now.getDate() - 1,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }
    setDiffSec(diffSec - 1000);
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      setTimeCountdown();
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <CustomTextBlue style={styles.textTitle}>
          สลากงวดใหม่จะพร้อมให้บริการขายใน
        </CustomTextBlue>
        <CustomTextBlue style={styles.textTitle}>
          วันที่ {stringDateEnd} น.
        </CustomTextBlue>
      </View>

      <View style={styles.containerCirecles}>
        <View style={styles.circles}>
          <CustomText style={styles.textInner}>
            {("0" + coundownTimer.days).slice(-2)}
          </CustomText>
          <CustomText style={styles.textTime}>วัน</CustomText>
        </View>
        <View style={styles.circles}>
          <CustomText style={styles.textInner}>
            {("0" + coundownTimer.hours).slice(-2)}
          </CustomText>
          <CustomText style={styles.textTime}>ชั่วโมง</CustomText>
        </View>
        <View style={styles.circles}>
          <CustomText style={styles.textInner}>
            {("0" + coundownTimer.minutes).slice(-2)}
          </CustomText>
          <CustomText style={styles.textTime}>นาที</CustomText>
        </View>
        <View style={styles.circles}>
          <CustomText style={styles.textInner}>
            {("0" + coundownTimer.seconds).slice(-2)}
          </CustomText>
          <CustomText style={styles.textTime}>วินาที</CustomText>
        </View>
      </View>

      <View style={{ marginVertical: 25 }}>
        <CustomTextBold style={styles.textTitle}>
          ลอตเตอรี่ออนไลน์ ซื้อเองง่าย จ่ายโดยรัฐบาล
        </CustomTextBold>
      </View>
      <View>
        <CustomTextBold style={{ color: "#0092D2", fontSize: 22 }}>
          ราคา {webConfig.lotteryPrice} บาท ไม่มีค่าบริการ
        </CustomTextBold>
      </View>
      <View style={{ padding: 10 }}>
        <CustomText style={{ color: "#0b2760", fontSize: 18 }}>
          ลอตเตอรี่งวดวันที่ {RoundDate}
        </CustomText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom:7,
  },
  containerInner: {
    margin: 20,
    alignItems: "center",
  },
  containerText: {
    margin: 20,
    alignItems: "center",
  },
  textInner: {
    fontSize: 30,
    color: "#0b2760",
  },
  textTime: {
    fontSize: 12,
    color: "#76808f",
  },
  textTitle: {
    marginStart: -7,
    marginEnd: -7,
    fontSize: 17,
    color: "#0b2760",
  },
  containerCirecles: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  circles: {
    flexDirection: "column",
    backgroundColor: "#dcdcde",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
  },
});

export default CountDownRound;
