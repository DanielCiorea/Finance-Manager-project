const config = require("./config");

const knex = require("knex")(config);

exports.createUser = (name, email, password, budget) =>
  knex("users").insert({ name, email, password, budget });

exports.findUsersByEmail = async (email) => {
  const users = await knex
    .select("id", "name", "email", "password")
    .where({ email })
    .from("users");

  return users.length < 1 ? undefined : users[0];
};

//TODO - implement functionality
exports.getBudget = (id) =>
  knex.select("id", "budget").where({ id }).from("users");

exports.modifyBudget = (id, budget) =>
  knex("users").where({ id }).update({ budget });

/******************  TRANSACTIONS *******************/

exports.listTransactions = (userId) =>
  knex
    .select("id", "description", "amount")
    .where({ userId })
    .from("transactions");

exports.createTransaction = (userId, description, amount) =>
  knex("transactions").insert({ userId, description, amount });

// Modify not used... yet.
exports.modifyTransaction = (userId, id, description, amount) =>
  knex("transactions").where({ userId, id }).update({ description, amount });

exports.deleteTransaction = (userId, id) =>
  knex("transactions").where({ userId, id }).del();
