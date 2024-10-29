import { View } from "react-native";
import React, { ReactNode } from "react";
import { Stack } from "expo-router";

type FullScreenProps = {
    children: ReactNode;
};

export default function FullScreen({ children }: FullScreenProps) {
    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} />

            {children}
        </View>
    );
}
