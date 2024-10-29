// app/login/index.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (


    <View style={styles.container}>
      <Text style={styles.welcomeText}>bem-vindo!</Text>
      <Text style={styles.logo}>CENTAVO</Text>
      
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="e-mail" placeholderTextColor="#A0A0A0" />
        <TextInput style={styles.input} placeholder="e-mail" placeholderTextColor="#A0A0A0" />
        <TextInput style={styles.input} placeholder="senha" placeholderTextColor="#A0A0A0" secureTextEntry />
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText} onPress={() => alert('teste')}>LOGIN</Text>
      </TouchableOpacity>
    </View>
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
  logo: {
    fontSize: 36,
    fontFamily: 'MontserratAlternates_400Regular',
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
    fontFamily: 'MontserratAlternates_400Regular',
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'right',
    fontFamily: 'MontserratAlternates_400Regular',
  },
  registerText: {
    fontSize: 14,
    color: '#A0A0A0',
    marginVertical: 15,
    fontFamily: 'MontserratAlternates_400Regular',
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
    fontFamily: 'MontserratAlternates_400Regular',
  },
});
