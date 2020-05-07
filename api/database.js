const config = require("./config");

const knex = require("knex")(config);

exports.createEntry = (description, amount) =>
  knex("transactions").insert({ description, amount });

exports.modifyEntry = (id, description, amount) =>
  knex("transactions").where({ id }).update({ description, amount });

exports.deleteEntry = (id) => knex("transactions").where({ id }).del();

exports.listEntries = () =>
  knex.select("id", "description", "amount").from("transactions");

exports.getBudget = () => knex.select("budget").from("users");

exports.modifyBudget = (id, budget) =>
  knex("users").where({ id }).update({ budget });
