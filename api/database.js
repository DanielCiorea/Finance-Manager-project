const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "1234",
    database: "sums",
  },
});

exports.createEntry = (description, amount) =>
  knex("sums").insert({ description, amount });

exports.modifyEntry = (id, description, amount) =>
  knex("sums").where("id", "=", id).update({ description, amount });

exports.deleteEntry = (id) => knex("sums").where("id", "=", id).del();

exports.listEntries = () =>
  knex.select("id", "description", "amount").from("sums");
