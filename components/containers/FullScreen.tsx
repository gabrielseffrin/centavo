// FullScreen.tsx
import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";


type FullScreenProps = {
    children: ReactNode;
};

export default function FullScreen({ children }: FullScreenProps) {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            {children}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF8F0',
        alignItems: 'center', 
        justifyContent: 'center',
    },
});
