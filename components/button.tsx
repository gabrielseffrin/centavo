import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface buttonProps {
  title: string;     
  onPress: () => void;  
}

export default function ButtonComponent({ title, onPress }: buttonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonStyle}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
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
    marginTop: 4 , 
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'MontserratAlternates_400Regular',
  },
});