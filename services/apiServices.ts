import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restapi-centavo.onrender.com',
});

export const loginUser = async (email: any, password: any) => {
  try {
    const response = await api.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const saveCategorias = async (name: string, category_type: number) => {
  try {
    const response = await api.post('/api/registra-categoria', {name, category_type} );
    return response.data;
  } catch (error) {
    console.log('Erro ao cadastrar categoria:', error);
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get('/api/categorias');
    return response.data;
  } catch (error) {
    console.log('Erro ao buscar categorias:', error);
  }
};

export const getTransacao = async (idUser: number) => {
  try {
    const response = await api.get(`/api/despesas/${idUser}`);
    return response.data;
  } catch (error) {
    console.log('Erro ao buscar transacao:', error);
  }
}; 

export const saveTransaction = async (user_id: number, category_id: number, amount: number) => {

  try {
    const location_id = 1;
    
    const today = new Date();
    const date = today.toISOString().split('T')[0]; 

    const response = await api.post('/api/register-transaction', { date, user_id, category_id, location_id, amount });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar transação:', error);
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    console.log(id);
    const response = await api.delete(`/api/delete-transaction/${id}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao excluir transação:", error);
  }
};

export const editTransaction = async (id: number, amount: number, category_id: number, date: string) => {
  try {
    const response = await api.post(`/api/edit-transaction`, { id, amount, category_id, date });
    return response.data;
  } catch (error) {
    console.log("Erro ao editar transação:", error);
  }
};