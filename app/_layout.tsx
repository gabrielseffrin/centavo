import { SplashScreen, Stack } from "expo-router";
import {
  useFonts,
  MontserratAlternates_400Regular,
} from "@expo-google-fonts/montserrat-alternates";
import { useEffect } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import React from "react";
import { CategoriasProvider } from "./context/categoriasContext";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    MontserratAlternates_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }

  return (
    <CategoriasProvider>
      <ActionSheetProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ActionSheetProvider>
    </CategoriasProvider>
  );
}
