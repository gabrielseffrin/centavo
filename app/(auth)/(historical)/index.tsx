import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import FullScreen from "../../../components/containers/FullScreen";
import CustomText from "../../../components/customText";
import {
  deleteTransaction,
  editTransaction,
  getCategorias,
  getTransacao,
} from "../../../services/apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Tipos de dados para os arrays
interface Categoria {
  id: number;
  categoria: string;
  category_type_id: 2 | 1;
  valor: string;
  name: string;
}

interface Transacao {
  id: number;
  category_id: number;
  category_type_id: number;
  amount: string;
  name: string;
  date: string;
}

export default function Historical() {
  const [selectedMonth, setSelectedMonth] = useState("Fevereiro");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log("Dados do usuário carregados:", parsedUser);
        } else {
          console.warn("Nenhum usuário encontrado no AsyncStorage.");
        }
      } catch (error) {
        console.error("Erro ao recuperar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteTransaction = async (id: number) => {
    try {
      const response = await deleteTransaction(id);
      Alert.alert("Sucesso", response.message);
      loadData();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a transação.");
    }
  };

  const handleEditTransaction = async (
    id: number,
    amount: number,
    category_id: number,
    date: string
  ) => {
    try {
      const response = await editTransaction(id, amount, category_id, date);
      Alert.alert("Sucesso", "Transação atualizada com sucesso.");
      loadData();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a transação.");
    }
  };

  const loadData = async () => {
    try {
      const categoriasResponse = await getCategorias();

      if (!user || !user.id) {
        console.warn(
          "Usuário não carregado corretamente, abortando requisição das transações."
        );
        return;
      }

      const transacoesResponse = await getTransacao(user.id);

      if (categoriasResponse && transacoesResponse) {
        setCategorias(categoriasResponse);
        setTransacoes(transacoesResponse);
      } else {
        throw new Error("Erro ao carregar dados da API.");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const totalRenda = transacoes
    .filter((transacao) => transacao.category_type_id === 1)
    .reduce((acc, item) => acc + parseFloat(item.amount || "0"), 0);

  const totalDespesa = transacoes
    .filter((transacao) => transacao.category_type_id === 2)
    .reduce((acc, item) => acc + parseFloat(item.amount || "0"), 0);

  const saldo = totalRenda - totalDespesa;
  const barData = {
    labels: ["Renda", "Despesa"],
    datasets: [{ data: [totalRenda, totalDespesa] }],
  };

  const getRandomColor = () => {
    let color = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${color}`;
  };

  const groupedTransactions = transacoes
    .filter((t) => t.category_type_id === 2)
    .reduce((acc, transacao) => {
      const existing = acc.find((item) => item.name === transacao.name);
      if (existing) {
        existing.population += parseFloat(transacao.amount) || 0;
      } else {
        acc.push({
          name: transacao.name,
          population: parseFloat(transacao.amount) || 0,
          color: getRandomColor(),
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      }
      return acc;
    }, [] as { name: string; population: number; color: string; legendFontColor: string; legendFontSize: number }[]);

  const pieData = groupedTransactions.map((cat) => ({
    name: cat.name,
    population: cat.population,
    color: getRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  if (loading) {
    return (
      <FullScreen>
        <CustomText>Carregando dados...</CustomText>
      </FullScreen>
    );
  }

  return (
    <FullScreen>
      <View style={styles.container}>
        <CustomText style={styles.welcomeText}>
          Resumo do mês: {selectedMonth}
        </CustomText>
        <ScrollView>
          <CustomText style={styles.sectionTitle}>Gráfico de Barras</CustomText>

          <BarChart
            data={barData}
            width={Dimensions.get("window").width - 30}
            height={220}
            yAxisSuffix=""
            yAxisLabel="R$"
            chartConfig={{
              backgroundColor: "#FFF",
              backgroundGradientFrom: "#FFF",
              backgroundGradientTo: "#FFF",
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            verticalLabelRotation={0}
            fromZero
          />

          <CustomText style={styles.sectionTitle}>Gráfico de Pizza</CustomText>

          <PieChart
            data={pieData}
            width={Dimensions.get("window").width - 30}
            height={220}
            chartConfig={{
              backgroundColor: "#FFF",
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          <CustomText style={styles.sectionTitle}>Detalhes</CustomText>
          {transacoes.length > 0 ? (
            transacoes.map((item) => (
              <View key={item.id} style={styles.infoBox}>
                <CustomText style={styles.categoryText}>{item.name}</CustomText>
                <CustomText
                  style={
                    item.category_type_id === 2
                      ? styles.expenseText
                      : styles.incomeText
                  }
                >
                  {item.name}: R$ {parseFloat(item.amount).toFixed(2)}
                </CustomText>
                <CustomText>
                  Data: {item.date.split("T")[0]}
                </CustomText>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() =>
                      handleEditTransaction(1, 100.0, 1, "2025-02-01")
                    }
                  >
                    <CustomText>editar</CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTransaction(item.id)}>
                    <CustomText>excluir</CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <CustomText>Nenhuma categoria encontrada.</CustomText>
          )}
        </ScrollView>
      </View>
    </FullScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expenseText: {
    color: "red",
    fontSize: 18,
  },
  incomeText: {
    color: "green",
    fontSize: 18,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingVertical: 1, // Ajuste o padding para controlar o tamanho
    paddingHorizontal: 1,
  },
});
