import React, { useState, useEffect, useContext } from "react";

import { AppStateContext } from "../../contexts/AppStateProvider";
import callApi from "../../assets/api/callApi";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import FormPhone from "./formPhone";
import FormLine from "./formLine";
import FormOtp from "./formOtp";
import FormName from "./formName";
import Profile from "./profile";
import { useFocusEffect } from "@react-navigation/core";

function Member({ navigation }) {
  //แสดง Component
  const [showFormPhone, setShowFormPhone] = useState(true);
  const [showFormLine, setShowFormLine] = useState(false);
  const [showFormOtp, setShowFormOtp] = useState(false);

  // state อายุ และ เวลาขอ Otp อีกครั้ง
  const [isOver20, setIsOver20] = useState(false);
  const [showSendOtpAgain, setShowSendOtpAgain] = useState(false);

  //state ของข้อมูลที่กรอก
  const [phone, setPhone] = useState(0);
  const [otp, setOtp] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const context = useContext(AppStateContext);
  const [isLoading, setAppLoading] = useState(false);
  const [refreshLottery, setRefreshLottery] = useState(false);

  const countdownToShowSendOtpAgain = () => {
    setTimeout(function () {
      setShowSendOtpAgain(true);
    }, 60000);
  };

  useEffect(() => {
    getToken();
  }, [context.token]);

  useFocusEffect(
    React.useCallback(() => {
      getToken();
      
    }, [refreshLottery, showFormLine])
  );

  const getToken = async () => {
    if (context.token) {
      setShowFormLine(false);
      setShowFormPhone(false);
      setShowFormOtp(false);
      const me = await callApi({ url: "/users/me" });
      context.setMe(me);
    } else {
      setShowFormPhone(true);
      context.setToken(null);
      context.setMe("");
    }
  };
  const wait = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setAppLoading(true);
    
    setRefreshLottery(!refreshLottery);
    getToken().then(() => {
      return setAppLoading(false), setRefreshing(false);
    });
    // wait(2000).then(() => {
    //   return (
    //   setAppLoading(false),
    //   setRefreshing(false)
    //   )
    // });
  };

  if (showFormLine) {
    return (
      <FormLine
        navigation={navigation}
        setShowFormLine={setShowFormLine}
        setRefreshLottery={setRefreshLottery}
        refreshLottery={refreshLottery}
      />
    );
  } else {
    
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {showFormPhone && (
            <FormPhone
              phone={phone}
              setPhone={setPhone}
              setShowFormPhone={setShowFormPhone}
              setShowFormLine={setShowFormLine}
              setShowFormOtp={setShowFormOtp}
              setShowSendOtpAgain={setShowSendOtpAgain}
              countdownToShowSendOtpAgain={countdownToShowSendOtpAgain}
            />
          )}
          {showFormOtp && (
            <FormOtp
              phone={phone}
              otp={otp}
              setOtp={setOtp}
              setShowFormOtp={setShowFormOtp}
              setShowSendOtpAgain={setShowSendOtpAgain}
              showSendOtpAgain={showSendOtpAgain}
              countdownToShowSendOtpAgain={countdownToShowSendOtpAgain}
            />
          )}

          {context.token && !context.me.firstName ? (
            <FormName
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              isOver20={isOver20}
              setIsOver20={setIsOver20}
            />
          ) : (
            <Text></Text>
          )}
          {context.token && context.me.firstName ? (
            <Profile
              setShowFormPhone={setShowFormPhone}
              navigation={navigation}
            />
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    );
  }
}
export default Member;
