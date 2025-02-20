import React, { useState } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, Alert } from 'react-native';
import { Link, router } from "expo-router";
import ButtonComponent from '../components/button';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import CustomTextInput from '../components/customInputText';
import CustomText from '../components/customText';
import { loginUser } from '../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from "zod";

// teste
const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      Alert.alert("Erro", errors.email?._errors?.[0] || errors.password?._errors?.[0]);
      return;
    }

    try {
      const response = await loginUser(email, password);
      Alert.alert('Sucesso', 'Login realizado!');
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      router.replace('/(auth)/(home)/home');
    } catch (error) {
      Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Image source={require('../assets/centavo.png')} style={{ width: 200, height: 200 }} />
        
        <View style={styles.inputContainer}>
          <CustomTextInput 
            placeholder="e-mail" 
            placeholderTextColor="#A0A0A0" 
            value={email} 
            onChangeText={setEmail}
          />
          
          <CustomTextInput 
            placeholder="senha" 
            placeholderTextColor="#A0A0A0" 
            value={password} 
            onChangeText={setPassword}
            secureTextEntry 
          />
          
          <Link href="/register">
            <CustomText style={styles.forgotPasswordText}>esqueceu sua senha?</CustomText>
          </Link>
        </View>
        
        <Link href="/register">
          <CustomText style={styles.registerText}>cadastre-se</CustomText>
        </Link>

        <ButtonComponent title='LOGIN' onPress={handleLogin} />
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
