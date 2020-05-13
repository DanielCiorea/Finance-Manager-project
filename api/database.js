const config = require("./config");

const knex = require("knex")(config);

exports.createTransaction = (description, amount) =>
  knex("transactions").insert({ description, amount });

exports.modifyTransaction = (id, description, amount) =>
  knex("transactions").where({ id }).update({ description, amount });

exports.deleteTransaction = (id) => knex("transactions").where({ id }).del();

exports.listTransactions = () =>
  knex.select("id", "description", "amount").from("transactions");

exports.getBudget = () => knex.select("budget").from("users");

exports.modifyBudget = (id, budget) =>
  knex("users").where({ id }).update({ budget });
