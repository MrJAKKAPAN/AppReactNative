////////  game ---> สร้าง Route ใหม่แทนอันเก่าที่ไม่สามารถกดไปหน้าที่ไม่มีใน TabButtom และ reviewCode   ( 26-4-64  10:32 น. ) ////////

import React, { useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, TouchableOpacity } from "react-native";

import Home from "../screens/home";
import Member from "../screens/member";
import Dashboard from "../screens/dashboard";
import Cart from "../screens/cart";
import Contact from "../screens/contact";
import Payment from "../screens/payment";
import DeatailLotteries from "../screens/home/detailLotteries";
import SearchLotteries from "../screens/home/searchLotteries";
import LotteryView from "../screens/home/lotteryView";
import LotteriesAll from "../screens/home/lotteriesAll";
import { AppStateContext } from "../contexts/AppStateProvider";

import { TabActions } from "@react-navigation/native";

const CratStack = createStackNavigator();
const MenberStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="หน้าหลัก" component={Home} />
      <HomeStack.Screen name="detailLotteries" component={DeatailLotteries} />
      <HomeStack.Screen name="searchLotteries" component={SearchLotteries} />
      <HomeStack.Screen name="cart" component={Cart} />
      <HomeStack.Screen name="LotteryView" component={LotteryView} />
      <HomeStack.Screen name="LotteriesAll" component={LotteriesAll} />
    </HomeStack.Navigator>
  );
}
function MemberStackScreen({ navigation }) {
  return (
    <MenberStack.Navigator screenOptions={{ headerShown: false }}>
      <MenberStack.Screen name="สมาชิก" component={Member} />
      <MenberStack.Screen name="Payments" component={Payment} />
    </MenberStack.Navigator>
  );
}

function DashboardStackScreen({ navigation }) {
  const [token, setToken] = useState("");
  const jumpToMember = TabActions.jumpTo("สมาชิก");
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = async () => {
    let token = await SecureStore.getItemAsync("accessToken");
    if (token) {
      setToken(token);
    } else {
      navigation.dispatch(jumpToMember);
    }
  };
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen
        component={Dashboard}
        name={"ตู้เซฟสมาชิก"}
        // component={token ? Dashboard : Member}
        // name={token ? "ตู้เซฟสมาชิก" : "สมาชิก"}
      />
      <DashboardStack.Screen name="Payment" component={Payment} />
    </DashboardStack.Navigator>
  );
}

function CartStackScreen() {
  return (
    <CratStack.Navigator screenOptions={{ headerShown: false }}>
      <CratStack.Screen name="ตระกร้า" component={Cart} />
      <CratStack.Screen name="Payments" component={Payment} />
      <CratStack.Screen name="LottaryView" component={LotteryView} />
      <HomeStack.Screen name="หน้าหลัก" component={Home} />
    </CratStack.Navigator>
  );
}

const RoutesTab = ({ data, navigation, token }) => {

  const context = useContext(AppStateContext)

  return (
    <Tab.Navigator
      initialRouteName="หน้าหลัก"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "หน้าหลัก") {
            iconName = focused
              ? require("../assets/images/homeGold.png")
              : require("../assets/images/home.png");
          } else if (route.name === "สมาชิก") {
            iconName = focused
              ? require("../assets/images/profileGold.png")
              : require("../assets/images/user.png");
          } else if (route.name === "ตู้เซฟสมาชิก") {
            iconName = focused
              ? require("../assets/images/safeGold.png")
              : require("../assets/images/safe.png");
          } else if (route.name === "ตระกร้า") {
            iconName = focused
              ? require("../assets/images/cartGold.png")
              : require("../assets/images/cart.png");
          } else if (route.name === "ติดต่อเรา") {
            iconName = focused
              ? require("../assets/images/goldContact.png")
              : require("../assets/images/blackContact.png");
          }
          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: 20, height: 20 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#d4af37",
        inactiveTintColor: "#071737",
        labelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
          fontFamily: "Anuphan-Regular",
        },
      }}
    >
      <Tab.Screen name="หน้าหลัก" component={HomeStackScreen} />
      <Tab.Screen name="สมาชิก" component={MemberStackScreen} />
      <Tab.Screen name="ตู้เซฟสมาชิก" component={DashboardStackScreen} />
      <Tab.Screen
        name="ตระกร้า"
        component={CartStackScreen}
        options={{
          tabBarBadge: context.badgeCartTab,
        }}
      />
      <Tab.Screen name="ติดต่อเรา" component={Contact} />
    </Tab.Navigator>
  );
};

export default RoutesTab;
