import {View} from "react-native"
import {StatusBar} from "expo-status-bar"
import {Slot} from "expo-router"

export default function Layout() {
    return <View>
        <StatusBar
            style='light'
        />
        <Slot/>
    </View>
}