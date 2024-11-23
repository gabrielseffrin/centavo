import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CustomText from "./customText";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { nome: string; tipo: number }) => void; // Alterado para refletir categorias
  title: string;
}

export default function CadastroCategoriaModal({ 
  visible, 
  onClose, 
  onSave, 
  title,
}: ModalProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<number | null>(null);

  const handleSave = () => {
    if (!nome || tipo === null) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    onSave({ nome, tipo });
    setNome("");
    setTipo(null);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <CustomText style={styles.closeButtonText}>×</CustomText>
          </TouchableOpacity>

          <CustomText style={styles.modalTitle}>{title}</CustomText>

          <TextInput
            style={styles.input}
            placeholder="Nome da Categoria"
            value={nome}
            onChangeText={setNome}
          />
          
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                tipo === 1 && styles.radioSelected,
              ]}
              onPress={() => setTipo(1)}
            >
              <CustomText style={styles.radioText}>Despesa</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButton,
                tipo === 2 && styles.radioSelected,
              ]}
              onPress={() => setTipo(2)}
            >
              <CustomText style={styles.radioText}>Renda</CustomText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
            <CustomText style={styles.confirmButtonText}>Salvar</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000",
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
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  radioButton: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
  },
  radioSelected: {
    backgroundColor: "#4169E1",
  },
  radioText: {
    color: "#000",
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
