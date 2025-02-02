import React, { createContext, useContext, useState, useEffect } from "react";
import { getTransacao } from "../../services/apiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import user from "../(auth)/(user)";

interface Transacao {
  id: number;
  amount: string;
  category_type_id: number;
}

interface TransacoesContextType {
  despesas: number;
  renda: number;
  balanco: number;
  carregarTransacoes: () => void;
  user: any;
}

const TransacoesContext = createContext<TransacoesContextType | undefined>(undefined);

export const TransacoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [despesas, setDespesas] = useState(0);
  const [renda, setRenda] = useState(0);
  const [balanco, setBalanco] = useState(0);

  const carregarTransacoes = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) return;

      const user = JSON.parse(userData);
      const response = await getTransacao(user.id);

      if (response) {
        const despesas = response.filter((t: Transacao) => t.category_type_id === 2);
        const totalD = despesas.reduce((acc: number, t: { amount: any; }) => acc + parseFloat(t.amount || "0"), 0);

        const renda = response.filter((t: Transacao) => t.category_type_id === 1);
        const totalR = renda.reduce((acc: number, t: { amount: any; }) => acc + parseFloat(t.amount || "0"), 0);

        setDespesas(totalD);
        setRenda(totalR);
        setBalanco(totalR - totalD);
      }
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  return (
    <TransacoesContext.Provider value={{ despesas, renda, balanco, carregarTransacoes, user }}>
      {children}
    </TransacoesContext.Provider>
  );
};

export const useTransacoes = () => {
  const context = useContext(TransacoesContext);
  if (!context) {
    throw new Error("useTransacoes deve ser usado dentro de um TransacoesProvider");
  }
  return context;
};
