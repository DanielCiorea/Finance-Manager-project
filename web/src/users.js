import axios from "axios";

export const signUp = (name, email, password) =>
  axios.post("http://localhost:8080/signUp", { name, email, password });

export const signIn = async (email, password) => {
  const result = await axios.post("http://localhost:8080/signIn", {
    email,
    password,
  });
  return result.data;
};
