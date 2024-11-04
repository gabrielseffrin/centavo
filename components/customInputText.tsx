// components/CustomTextInput.tsx
import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

type CustomTextInputProps = TextInputProps;

export default function CustomTextInput({ style, ...props }: CustomTextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'MontserratAlternates_400Regular',
    height: 50,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
