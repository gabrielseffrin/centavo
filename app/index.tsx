import React from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';
import { Link, router } from "expo-router";
import ButtonComponent from '../components/button';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import CustomTextInput from '../components/customInputText';
import CustomText from '../components/customText';

export default function loginScreen() {
  
  const checkLogin = () => {
    router.replace('/(auth)/(home)/home')
  };
  

  return (

    <ActionSheetProvider>
    <View style={styles.container}>

      <Image source={require('../assets/centavo.png')} style={{ width: 200, height: 200 }} />
      
      <View style={styles.inputContainer}>
        <CustomTextInput 
          placeholder="e-mail" 
          placeholderTextColor="#A0A0A0" 
        />
        
        <CustomTextInput 
          placeholder="senha" 
          placeholderTextColor="#A0A0A0" 
          secureTextEntry 
        />
        
        <Link href="/register">
          <CustomText style={styles.forgotPasswordText}>esqueceu sua senha?</CustomText>
        </Link>
      </View>
      
      <Link href="/register">
        <CustomText style={styles.registerText}>cadastre-se</CustomText>
      </Link>

      <ButtonComponent title='LOGIN' onPress={checkLogin}></ButtonComponent>

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
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: '',
    color: '#000',
    marginBottom: 10,
  },
  logo: {
    fontSize: 36,
    color: '#000',
    marginBottom: 40,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 5,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
  },
  registerText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginVertical: 15,
  },
});
