import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import FullScreen from "../../../components/containers/FullScreen";
import CustomText from "../../../components/customText";
import categorias from "../../../db.json";

export default function HomeScreen() {
  return (
    <FullScreen>
      <View style={styles.header}>
        <CustomText style={styles.welcomeText}>categorias</CustomText>
      </View>

      <TouchableOpacity style={styles.incomeButton}>
        <CustomText style={[styles.buttonText]}>cadastrar categoria</CustomText>
      </TouchableOpacity>

      {/* ScrollView para permitir rolagem das categorias */}
      <ScrollView style={styles.scrollView}>
        {categorias.map((item) => (
          <View key={item.id} style={styles.infoBox}>
            <CustomText style={styles.categoryText}>
              {item.categoria}
            </CustomText>
            <CustomText
              style={item.tipo === 1 ? styles.expenseText : styles.incomeText}
            >
              {item.tipo === 1 ? "Gasto" : "Entrada"}
            </CustomText>
          </View>
        ))}
      </ScrollView>
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    width: "100%",
    padding: 20,
  },
  incomeButton: {
    backgroundColor: "#FFF",
    width: "80%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 12,
  },
  scrollView: {
    flex: 1, // Faz o ScrollView preencher toda a altura disponível
    width: "90%", // Faz o ScrollView preencher toda a largura da tela
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#000",
  },
  username: {
    color: "#4169E1", // azul para destacar o username
  },
  categoryBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 18,
    color: "#333",
  },
  expenseText: {
    color: "red",
    fontSize: 16,
  },
  incomeText: {
    color: "green",
    fontSize: 16,
  },
});
