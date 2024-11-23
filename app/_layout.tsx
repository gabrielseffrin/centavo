// app/_layout.tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, MontserratAlternates_400Regular } from '@expo-google-fonts/montserrat-alternates';
import { useEffect } from 'react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

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
    <ActionSheetProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      
    </ActionSheetProvider>

    
    
  );
}
