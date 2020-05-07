import axios from "axios";

export const getBudget = async () => {
  const budget = await axios.get("http://localhost:8080/users");
  return budget.data;
};

export const listEntries = async () => {
  const result = await axios.get("http://localhost:8080/entries");
  return result.data;
};

export const createEntry = (description, amount) =>
  axios.post("http://localhost:8080/entries", {
    description,
    amount,
  });

export const modifyEntry = (id, description, amount) =>
  axios.put(`http://localhost:8080/entries/${id}`, {
    description,
    amount,
  });

export const deleteEntry = (id) =>
  axios.delete(`http://localhost:8080/entries/${id}`);
