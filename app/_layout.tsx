import {Stack} from "expo-router";

import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import '@/global.css'
import {StatusBar} from "expo-status-bar"

export default function RootLayout() {
    return (
        <GluestackUIProvider>
            <StatusBar
                style='dark'
            />
            <Stack
                screenOptions={{
                    headerShown: false
                }}
            />
        </GluestackUIProvider>
    );
}
