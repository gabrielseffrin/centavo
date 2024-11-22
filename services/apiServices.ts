export const saveExpense = async (data: { value: string; category: string; location: string }) => {
  try {
    // Simulação de uma requisição POST para o backend
    const response = await fetch("https://suaapi.com/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar despesa");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro:", error);
    throw error;
  }
};
