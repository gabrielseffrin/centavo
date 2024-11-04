// home.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FullScreen from "../components/containers/FullScreen";
import CustomText from "../components/customText";
import { Image } from 'react-native';

export default function HomeScreen() {
    return (
        <FullScreen>
            <View style={styles.header}>
                <CustomText style={styles.welcomeText}>bem-vindo <CustomText style={styles.username}>username</CustomText>!</CustomText>
            </View>
            
            <View style={styles.infoBox}>
                <CustomText style={styles.infoText}>neste mês</CustomText>
                <CustomText style={styles.expenseText}>despesas: x.xxx,xx</CustomText>
                <CustomText style={styles.incomeText}>renda: x.xxx,xx</CustomText>
                <CustomText style={styles.balanceText}>balanço: x.xxx,xx</CustomText>
            </View>

            <TouchableOpacity style={styles.expenseButton}>
                <CustomText style={[styles.buttonText, ]}>informar despesa</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.incomeButton}>
                <CustomText style={styles.buttonText}>informar entrada</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryButton}>
                <CustomText style={styles.buttonText}>categorias</CustomText>
            </TouchableOpacity>

            <Image source={require('../assets/centavo.png')} style={{ width: 200, height: 50, position: "absolute", bottom: 20 }} />
        </FullScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'flex-start',
        width: '100%',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        color: '#000',
    },
    username: {
        color: '#4169E1', // azul para destacar o username
    },
    infoBox: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'flex-start',
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
    expenseText: {
        color: 'red',
        fontSize: 16,
    },
    incomeText: {
        color: 'green',
        fontSize: 16,
    },
    balanceText: {
        color: '#333',
        fontSize: 16,
    },
    expenseButton: {
        backgroundColor: '#000',
        width: '80%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 10,
    },
    incomeButton: {
        backgroundColor: '#FFF',
        width: '80%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginBottom: 10,
    },
    categoryButton: {
        backgroundColor: '#FFF',
        width: '80%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        borderColor: '#D0D0D0',
        borderWidth: 1,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16, 
    },
    logo: {
        fontSize: 24,
        fontFamily: '',
        color: '#000',
        
    },
});
