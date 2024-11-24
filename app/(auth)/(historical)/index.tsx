import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";
import FullScreen from "../../../components/containers/FullScreen";
import CustomText from "../../../components/customText";

export default function Historical() {
  const [selectedMonth, setSelectedMonth] = useState("Novembro");
  const [categorias, setCategorias] = useState([
    { id: 1, categoria: "Alimentação", tipo: "Despesa", valor: 500 },
    { id: 2, categoria: "Transporte", tipo: "Despesa", valor: 300 },
    { id: 3, categoria: "Salário", tipo: "Renda", valor: 5000 },
    { id: 4, categoria: "Lazer", tipo: "Despesa", valor: 400 },
  ]);

  const totalRenda = categorias
    .filter((cat) => cat.tipo === "Renda")
    .reduce((acc, item) => acc + item.valor, 0);
  const totalDespesa = categorias
    .filter((cat) => cat.tipo === "Despesa")
    .reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalRenda - totalDespesa;

  const barData = {
    labels: ["Renda", "Despesa"],
    datasets: [{ data: [totalRenda, totalDespesa] }],
  };

  const pieData = categorias
    .filter((cat) => cat.tipo === "Despesa")
    .map((cat) => ({
      name: cat.categoria,
      population: cat.valor,
      color:
        cat.categoria === "Alimentação"
          ? "tomato"
          : cat.categoria === "Transporte"
          ? "orange"
          : cat.categoria === "Lazer"
          ? "cyan"
          : "gold",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));

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
          {categorias.map((item) => (
            <View key={item.id} style={styles.infoBox}>
              <CustomText style={styles.categoryText}>
                {item.categoria}
              </CustomText>
              <CustomText
                style={
                  item.tipo === "Despesa"
                    ? styles.expenseText
                    : styles.incomeText
                }
              >
                {item.tipo}: R$ {item.valor},00
              </CustomText>
            </View>
          ))}
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#FFF",
    zIndex: 10,
  },
  welcomeText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expenseText: {
    color: "red",
    fontSize: 18,
  },
  incomeText: {
    color: "green",
    fontSize: 18,
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
  infoBox: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
});
