import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import CadastroCategoriaModal from "../../../components/cadastro-categoria-modal";
import FullScreen from "../../../components/containers/FullScreen";
import CustomText from "../../../components/customText";
import db from "../../../db.json";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categorias, setCategorias] = useState<{ id: number; categoria: string; tipo: number }[]>([]);

  const handleSaveCategoria = (data: { nome: string; tipo: number }) => {
    const novaCategoria = {
      id: categorias.length + 1,
      categoria: data.nome,
      tipo: data.tipo,
    };

    setCategorias([...categorias, novaCategoria]);
    Alert.alert("Sucesso", "Categoria cadastrada com sucesso!");
  };

  return (
    <FullScreen>
      <View style={styles.header}>
        <CustomText style={styles.welcomeText}>Categorias</CustomText>
      </View>

      <TouchableOpacity
        style={styles.incomeButton}
        onPress={() => setModalVisible(true)}
      >
        <CustomText style={styles.buttonText}>Cadastrar Categoria</CustomText>
      </TouchableOpacity>
      s
      <CadastroCategoriaModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        title="Cadastrar Categoria"
        onSave={handleSaveCategoria}
      />

      <ScrollView style={styles.scrollView}>
        {db.map((item) => (
          <View key={item.id} style={styles.infoBox}>
            <CustomText style={styles.categoryText}>{item.categoria}</CustomText>
            <CustomText
              style={item.tipo === 1 ? styles.expenseText : styles.incomeText}
            >
              {item.tipo === 1 ? "Despesa" : "Renda"}
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
  welcomeText: {
    fontSize: 24,
    color: "#000",
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
    flex: 1,
    width: "90%",
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
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
