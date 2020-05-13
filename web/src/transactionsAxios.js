import axios from "axios";

export const getBudget = async () => {
  const budget = await axios.get("http://localhost:8080/users");
  return budget.data;
};

export const listTransactions = async () => {
  const result = await axios.get("http://localhost:8080/transactions");
  return result.data;
};

export const createTransaction = (description, amount) =>
  axios.post("http://localhost:8080/transactions", {
    description,
    amount,
  });

export const modifyTransaction = (id, description, amount) =>
  axios.put(`http://localhost:8080/transactions/${id}`, {
    description,
    amount,
  });

export const deleteTransaction = (id) =>
  axios.delete(`http://localhost:8080/transactions/${id}`);
