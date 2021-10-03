////////  game ---> เลิกใช้ file Navbar.js มาใช้  Route แทน ( 26-4-64  14:30 น. ) ////////

import React, { useState } from "react";
import Route from "./routes/index";
import Header from "./components/Header";

import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";

import { fontsOnLocal } from "./components/LoadFonts";
import reducers from "./reducers";
import { AppStateProvider } from "./contexts/AppStateProvider";

let store = createStore(reducers);

function App() {
  let [fontsLoaded] = useFonts(fontsOnLocal.Anuphan);
  let [fontsLoadedOswald] = useFonts(fontsOnLocal.Oswald);

  if (!fontsLoaded || !fontsLoadedOswald) return <AppLoading />;

  return (
    <Provider store={store}>
      <AppStateProvider>
        <NavigationContainer>
          <Header />
          <Route />
        </NavigationContainer>
      </AppStateProvider>
    </Provider>
  );
}
export default App;


