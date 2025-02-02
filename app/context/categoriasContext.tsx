import React, { createContext, useContext, useEffect, useState } from "react";
import { getCategorias } from "../../services/apiServices";

interface Categoria {
  id: number;
  categoria: string;
  tipo: number;
}

interface CategoriasContextType {
  categorias: Categoria[];
  carregarCategorias: () => Promise<void>;
}

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export const CategoriasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregarCategorias = async () => {
    try {
      const response = await getCategorias();

      if (Array.isArray(response)) {
        const formattedCategories = response.map((item) => ({
          id: item.id,
          categoria: item.name,
          tipo: item.category_type_id || 0,
        }));

        setCategorias(formattedCategories);
      } else {
        console.error("Erro ao recuperar categorias: resposta não é um array", response);
      }
    } catch (error) {
      console.error("Erro ao recuperar categorias:", error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias, carregarCategorias }}>
      {children}
    </CategoriasContext.Provider>
  );
};

export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error("useCategorias deve ser usado dentro de um CategoriasProvider");
  }
  return context;
};
