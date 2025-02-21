import React, { useCallback, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FullScreen from "../../../components/containers/FullScreen";
import CustomText from "../../../components/customText";
import Modal from "../../../components/modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCategorias } from "../../context/categoriasContext";
import { getTransacao } from "../../../services/apiServices";
import { router, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const [isDespesaModalVisible, setDespesaModalVisible] = useState(false);
  const [isRendaModalVisible, setRendaModalVisible] = useState(false);
  const { categorias } = useCategorias();
  const [user, setUser] = useState<any>(null);
  const [transacoesCarregadas, setTransacoesCarregadas] = useState(false);
  const [despesas, setDespesas] = useState(0);
  const [renda, setRenda] = useState(0);
  const [balanco, setBalanco] = useState(0);
  const [reload, setReload] = useState(false);

  const fetchTransacoes = async (userId: number) => {
    try {
      const response = await getTransacao(userId);
      if (response) {
        const despesas = response.filter(
          (transacao: { category_type_id: number }) =>
            transacao.category_type_id === 2
        );

        const totalD = despesas.reduce(
          (acc: number, transacao: { amount: string }) =>
            acc + parseFloat(transacao.amount || "0"),
          0
        );

        setDespesas(totalD);

        const renda = response.filter(
          (transacao: { category_type_id: number }) =>
            transacao.category_type_id === 1
        );

        const totalR = renda.reduce(
          (acc: number, transacao: { amount: string }) =>
            acc + parseFloat(transacao.amount || "0"),
          0
        );

        setRenda(totalR);
        setBalanco(totalR - totalD);
      }
    } catch (error) {
      console.error("Erro ao recuperar as transações:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log("dados do usuário:", parsedUser);
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchTransacoes(user.id);
      }
    }, [user])
  );

  const handleSave = async () => {
    try {
      await fetchTransacoes(user.id);
      setReload(!reload);
      console.log("Transações atualizadas");
      router.replace('/(auth)/(home)/home');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os valores.");
    }
  };

  return (
    <FullScreen>
      <View style={styles.header}>
        <CustomText style={styles.welcomeText}>
          bem-vindo{" "}
          <CustomText style={styles.username}>
            {/* @ts-ignore */}
            {user ? user.name : "Usuário"}
          </CustomText>
          !
        </CustomText>
      </View>

      <View style={styles.infoBox}>
        <CustomText style={styles.infoText}>neste mês</CustomText>
        <CustomText style={styles.expenseText}>despesas: {despesas}</CustomText>
        <CustomText style={styles.incomeText}>renda: {renda}</CustomText>
        <CustomText style={styles.balanceText}>balanço: {balanco}</CustomText>
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

      {/* definindo o ID para passar ao Modal */}
      {user && user.id ? (
        <>
          <Modal
            visible={isDespesaModalVisible}
            onClose={() => {
              setDespesaModalVisible(false), handleSave;
            }}
            title="Informe sua Despesa"
            onSave={handleSave}
            categories={categorias}
            tipo={2}
            id={user.id}
          />

          <Modal
            visible={isRendaModalVisible}
            onClose={() => {
              setRendaModalVisible(false), handleSave;
            }}
            title="Informe sua Renda"
            onSave={handleSave}
            categories={categorias}
            tipo={1}
            id={user.id}
          />
        </>
      ) : (
        <CustomText>Usuário não encontrado!</CustomText>
      )}
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
