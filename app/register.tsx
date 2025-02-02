import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import CustomTextInput from '../components/customInputText';
import ButtonComponent from '../components/button';
import { registerUser } from '../services/apiServices';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      await registerUser({ name, email, password });
      Alert.alert('Sucesso', 'Cadastro realizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
    }
  };

  return (
    <View>
      <CustomTextInput placeholder="Nome" value={name} onChangeText={setName} />
      <CustomTextInput placeholder="E-mail" value={email} onChangeText={setEmail} />
      <CustomTextInput placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <CustomTextInput placeholder="Confirmar Senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <ButtonComponent title="CADASTRAR" onPress={handleRegister} />
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
