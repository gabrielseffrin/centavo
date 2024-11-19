// app/login/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonComponent from '../components/button';
import CustomText from '../components/customText';
import CustomTextInput from '../components/customInputText';

export default function LoginScreen() {
  return (


    <View style={styles.container}>
      <CustomText style={styles.welcomeText}>bem-vindo!</CustomText>
      <CustomText style={styles.logo}>CENTAVO</CustomText>
      
      <View style={styles.inputContainer}>
        <CustomTextInput style={styles.input} placeholder="e-mail" placeholderTextColor="#A0A0A0" />
        <CustomTextInput style={styles.input} placeholder="sennha" placeholderTextColor="#A0A0A0" secureTextEntry />
        <CustomTextInput style={styles.input} placeholder="confirme a senha" placeholderTextColor="#A0A0A0" secureTextEntry />
      </View>

      <ButtonComponent 
        title='LOGIN' 
        onPress={() => alert('funciona')}>
      </ButtonComponent>
      
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
  welcomeText: {
    fontSize: 24,
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
  input: {
    height: 50,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
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
    color: '#000000',
  },
});
