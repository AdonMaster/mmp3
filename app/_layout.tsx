import {Stack} from "expo-router";

import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';
import '@/global.css'
import Fallback from "@/components/Fallback"
import {SQLiteProvider} from 'expo-sqlite'
import {Suspense} from "react"
import LoadErrorContextProvider from "@/lib/contexts/LoadErrorContextProvider"
import {dbInit} from "@/lib/db/init"

export default function RootLayout() {
    return (
        <Suspense fallback={<Fallback />}>
            <SQLiteProvider databaseName="main.db" onInit={dbInit} useSuspense>
                <GluestackUIProvider>
                    <LoadErrorContextProvider>
                        <Stack
                            screenOptions={{
                                headerShown: false
                            }}
                        />
                    </LoadErrorContextProvider>
                </GluestackUIProvider>
            </SQLiteProvider>
        </Suspense>
    );
}
