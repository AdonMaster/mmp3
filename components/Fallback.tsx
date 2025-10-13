import {View} from "react-native"
import {Spinner} from "@/components/ui/spinner"

export default function Fallback() {
    return <View
        style={{
            flex: 1, alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#717275'
        }}
    >
        <Spinner size="large" color="white" />
    </View>
}