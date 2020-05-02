import axios from "axios";

const listEntries = async () => {
  const result = await axios.get("http://localhost:8080/entries");
  return result.data;
};

const createEntry = (description, amount) =>
  axios.post("http://localhost:8080/entries", {
    description,
    amount,
  });

exports.createEntry = (description, amount) =>
  knex("sums").insert({ description, amount });

exports.modifyEntry = (id, description, amount) =>
  knex("sums").where({ id }).update({ description, amount });

exports.deleteEntry = (id) => knex("sums").where({ id }).del();

exports.listEntries = () =>
  knex.select("id", "description", "amount").from("sums");
