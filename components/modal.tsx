import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import CustomText from "../components/customText";
import { Picker } from "@react-native-picker/picker";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { value: string; category: string; location: string }) => void;
  title: string;
  categories: { id: number, categoria: string; tipo: number }[];
}

export default function ModalDespesa({ 
  visible, 
  onClose, 
  onSave, 
  title,
  categories,
 }: ModalProps) {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState("");

  const handleSave = () => {
    if (!value || !category || !location) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    onSave({ value, category, location });
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
            placeholder="Valor"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="selecione uma categoria" value={null} />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.categoria} value={cat.categoria} />

            ))}

          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Local"
            value={location}
            onChangeText={setLocation}
          />

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
  picker: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    marginBottom: 20,
    width: "100%", height: 50,
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 20,
  },
  secondaryButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFF",
    fontSize: 14,
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