import React from 'react'
import {View} from 'react-native'
import AppLoading from 'expo-app-loading'
import {useFonts} from "expo-font"

const AppLoad = () => {
    let [fontsLoaded]=useFonts({
        "Anuphan":require("./assets/fonts/Anuphan-Bold.otf")
    })
    if(!fontsLoaded){
        return<AppLoading/>
    }
    return (
        <View>
            กองสลาก
        </View>
    )
}

export default AppLoading
