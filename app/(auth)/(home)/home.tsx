import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FullScreen from "../../../components/containers/FullScreen";
import CustomText from "../../../components/customText";
import Modal from "../../../components/modal";
import { saveExpense } from "../../../services/apiServices";
import db from "../../../db.json";

export default function HomeScreen() {
  const [isDespesaModalVisible, setDespesaModalVisible] = useState(false);
  const [isRendaModalVisible, setRendaModalVisible] = useState(false);
  const [categories, setCategories] = useState<{ id: number; categoria: string; tipo: number }[]>([]);

  useEffect(() => {
    setCategories(db); 
  }, []);
  
  const handleSave = async (data: { value: string; category: string; location: string }) => {
    try {
      await saveExpense(data);
      Alert.alert("Sucesso", "Despesa salva com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a despesa.");
    }
  };

  return (
    <FullScreen>
      <View style={styles.header}>
        <CustomText style={styles.welcomeText}>
          bem-vindo <CustomText style={styles.username}>username</CustomText>!
        </CustomText>
      </View>

      <View style={styles.infoBox}>
        <CustomText style={styles.infoText}>neste mês</CustomText>
        <CustomText style={styles.expenseText}>despesas: x.xxx,xx</CustomText>
        <CustomText style={styles.incomeText}>renda: x.xxx,xx</CustomText>
        <CustomText style={styles.balanceText}>balanço: x.xxx,xx</CustomText>
      </View>

      <TouchableOpacity
        style={styles.incomeButton}
        onPress={() => setDespesaModalVisible(true)}
      >
        <CustomText style={styles.buttonText}>informar despesa</CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.incomeButton}
        onPress={() => setRendaModalVisible(true)}
      >
        <CustomText style={styles.buttonText}>informar renda</CustomText>
      </TouchableOpacity>

      {/* Modal para Despesa */}
      <Modal
        visible={isDespesaModalVisible}
        onClose={() => setDespesaModalVisible(false)}
        title="Informe sua Despesa"
        onSave={handleSave}
        categories={categories}
        tipo={1}
      />

      {/* Modal para Renda */}
      <Modal
        visible={isRendaModalVisible}
        onClose={() => setRendaModalVisible(false)}
        title="Informe sua Renda"
        onSave={handleSave}
        categories={categories}
        tipo={2}
      />
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
  username: {
    color: "#4169E1", // azul para destacar o username
  },
  infoBox: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "flex-start",
  },
  infoText: {
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
  balanceText: {
    color: "#333",
    fontSize: 16,
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
    fontSize: 16,
    color: "#000",
  },
});
