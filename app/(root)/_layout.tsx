import {Image, View} from "react-native"
import {useSafeAreaInsets} from "react-native-safe-area-context"
import {HStack} from "@/components/ui/hstack"
import {moderateScale, verticalScale} from "@/utils/font-scaling"
import {Bell, CircleQuestionMarkIcon, HomeIcon} from 'lucide-react-native'
import {Tabs} from "expo-router"
import {StatusBar} from "expo-status-bar";


export default function Layout() {

    const safeInsets = useSafeAreaInsets()

    return <View
        style={{flex: 1, backgroundColor: '#717275', flexDirection: 'column'}}
    >

        <StatusBar
            style='light'
        />

        {/*top inset*/}
        <View
            style={{backgroundColor: '#717275', height: safeInsets.top}}
        />

        {/*toolbar*/}
        <HStack style={{
            backgroundColor: '#717275', boxShadow: '#00000020 0px 6px 8px',
            padding: moderateScale(12),
            alignItems: 'center'
        }}>
            <Image
                source={require('@/assets/img/border-art-2.jpg')}
                style={{
                    height: 256 * .12, width: 296 * .12, position: 'absolute', bottom: 0, right: 0,
                }}
            />

            <Image
                source={require('@/assets/img/logo-800.png')}
                style={{
                    height: 349 * .14, width: 714 * .14, resizeMode: 'contain'
                }}
            />
            <View
                style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 10
                }}
            >
                <Bell color={'white'} size={verticalScale(24)}/>
                <CircleQuestionMarkIcon color={'white'} size={verticalScale(24)}/>
            </View>
        </HStack>

        <View
            style={{flexGrow: 1}}
        >
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: 'white',
                    tabBarItemStyle: {backgroundColor: '#717275'},
                    tabBarShowLabel: false,
                    tabBarStyle: {
                    },
                    tabBarIconStyle: {
                        // Style your icon container
                        width: 40,
                        height: 40,
                    },
                }}
                safeAreaInsets={{bottom: 0, top: 0}}
            >
                <Tabs.Screen
                    name='dashboard'
                    options={{
                        tabBarLabel: () => null,
                        tabBarIcon: (t) => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <HomeIcon size={28} color={t.color}/>
                        </View>
                    }}
                />

                <Tabs.Screen
                    name='testing'
                    options={{
                        href: null
                    }}
                />

            </Tabs>

        </View>

        <View style={{
            backgroundColor: '#717275', height: safeInsets.bottom
        }}/>


    </View>
}