import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import {SQLiteProvider} from "expo-sqlite";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontLoaded] = useFonts({
        NotoSans: require('../assets/fonts/NotoSans/NotoSans-Regular.ttf'),
        NotoSerif: require('../assets/fonts/NotoSerif/NotoSerif-Regular.ttf'),
    });

    useEffect(() => {
        if (fontLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontLoaded]);

    if (!fontLoaded) {
        return null;
    }

    return (
        <SQLiteProvider databaseName={`${require('../package.json').name}.sqlite`}>
            <Stack screenOptions={{ headerShown: false }} initialRouteName={"(character)"}>
                <Stack.Screen name="(character)" />
            </Stack>
        </SQLiteProvider>
    );
}
