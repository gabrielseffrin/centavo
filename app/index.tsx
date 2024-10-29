// app/login/index.tsx
import { Image } from 'expo-image';
import React from 'react';
import { router } from "expo-router";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const entrar = () => {
  router.replace('/login');
};

export default function creen() {
  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>bem-vindo!</Text>
        
        <Image source={require('../assets/centavo.png')} style={{ width: 200, height: 200 }} />


        <TouchableOpacity style={styles.loginButton} onPress={entrar}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </ActionSheetProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'MontserratAlternates_400Regular',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'MontserratAlternates_400Regular',
    color: '#000',
    marginBottom: 10,
  },
  logoImage: { // Estilo para a imagem do logo
    width: 100, // Ajuste o tamanho conforme necessário
    height: 100,
    marginBottom: 20,
  },
  loginButton: {
    width: '60%',
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#A0A0A0',
    fontFamily: 'MontserratAlternates_400Regular',
  },
});

