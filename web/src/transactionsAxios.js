import axios from "axios";
import { getToken } from "./session";

export const getBudget = async () => {
  const budget = await axios.get("http://localhost:8080/users", {
    headers: { token: getToken() },
  });
  return budget.data;
};

export const modifyBudget = (id, budget) =>
  axios.put(
    `http://localhost:8080/users/${id}`,
    {
      budget,
    },
    {
      headers: { token: getToken() },
    }
  );

export const listTransactions = async () => {
  const result = await axios.get("http://localhost:8080/transactions", {
    headers: { token: getToken() },
  });
  return result.data;
};

export const createTransaction = (description, amount) =>
  axios.post(
    "http://localhost:8080/transactions",
    {
      description,
      amount,
    },
    {
      headers: { token: getToken() },
    }
  );

export const modifyTransaction = (id, description, amount) =>
  axios.put(
    `http://localhost:8080/transactions/${id}`,
    {
      description,
      amount,
    },
    {
      headers: { token: getToken() },
    }
  );

export const deleteTransaction = (id) =>
  axios.delete(`http://localhost:8080/transactions/${id}`, {
    headers: { token: getToken() },
  });
