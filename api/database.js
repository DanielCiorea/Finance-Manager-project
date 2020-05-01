const config = require("./config");

const knex = require("knex")(config);

exports.createEntry = (description, amount) =>
  knex("sums").insert({ description, amount });

exports.modifyEntry = (id, description, amount) =>
  knex("sums").where({ id }).update({ description, amount });

exports.deleteEntry = (id) => knex("sums").where({ id }).del();

exports.listEntries = () =>
  knex.select("id", "description", "amount").from("sums");
