import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomText from "../components/customText";
import { Picker } from "@react-native-picker/picker";
import { saveTransaction, getCategorias } from "../services/apiServices";

interface TransactionModalProps {
  tipo: number;
  id: number;
  onClose: () => void;
  onSave: () => void;
}

export default function TransactionModal({ tipo, id, onClose, onSave }: TransactionModalProps) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState<{ id: number; categoria: string; tipo: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategorias();
        setCategories(response.filter((cat: { tipo: number; }) => cat.tipo === tipo));
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [tipo]);

  const handleSave = async () => {
    if (!value || !category || !location) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      await saveTransaction(id, Number(category), parseFloat(value));
      setValue("");
      setLocation("");
      setCategory(undefined);
      onClose();
      onSave(); // Chama o onSave para atualizar a tela
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
    }
  };

  return (
    <View style={styles.modalContent}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <CustomText style={styles.modalTitle}>
            {tipo === 2 ? "Informe sua Despesa" : "Informe sua Renda"}
          </CustomText>

          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
            <Picker.Item label="Selecione uma categoria" value={undefined} />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.categoria} value={cat.id} />
            ))}
          </Picker>

          <TextInput style={styles.input} placeholder="Local" value={location} onChangeText={setLocation} />

          <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
            <CustomText style={styles.confirmButtonText}>Salvar</CustomText>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#EEE",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  picker: {
    width: "100%",
    height: 50,
  },
  confirmButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
