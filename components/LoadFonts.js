import React from "react";
import {useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const fontsOnLocal={
  'Anuphan':{
    "Anuphan-Bold": require("../assets/fonts/Anuphan/Anuphan-Bold.otf"),
    "Anuphan-ExtraLight": require("../assets/fonts/Anuphan/Anuphan-ExtraLight.otf"),
    "Anuphan-Light": require("../assets/fonts/Anuphan/Anuphan-Light.otf"),
    "Anuphan-Medium": require("../assets/fonts/Anuphan/Anuphan-Medium.otf"),
    "Anuphan-Regular": require("../assets/fonts/Anuphan/Anuphan-Regular.otf"),
    "Anuphan-SemiBold": require("../assets/fonts/Anuphan/Anuphan-SemiBold.otf"),
    "Anuphan-Thin": require("../assets/fonts/Anuphan/Anuphan-Thin.otf"),
  },
  'Oswald':{
    "Oswald-ExtraLight" : require("../assets/fonts/Oswald/Oswald-ExtraLight.ttf"),
    "Oswald-Regular" : require("../assets/fonts/Oswald/Oswald-Light.ttf"),
    "Oswald-Medium" : require("../assets/fonts/Oswald/Oswald-Regular.ttf"),
    "Oswald-SemiBold" : require("../assets/fonts/Oswald/Oswald-Medium.ttf"),
    "Oswald-Bold" : require("../assets/fonts/Oswald/Oswald-SemiBold.ttf"),
    "Oswald-Light" : require("../assets/fonts/Oswald/Oswald-Bold.ttf"),
  }
  
}

// const LoadFonts = () => {
//   let [fontsLoaded] = useFonts(fontsOnLocal.Anuphan);
//   let [fontsLoadedOswald]=useFonts(fontsOnLocal.Oswald);
//   if (!fontsLoaded&&!fontsLoadedOswald) return <AppLoading/>;
// };
export {fontsOnLocal};
