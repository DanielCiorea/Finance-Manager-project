const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "developer",
    password: "1234",
    database: "sums",
  },
});

const createEntry = (description, amount) =>
  knex("sums").insert({ description, amount });

const modifyEntry = (id, description, amount) =>
  knex("sums").where("id", "=", id).update({ description, amount });

const deleteEntry = (id) => knex("sums").where("id", "=", id).del();

const listEntries = () =>
  knex.select("id", "description", "amount").from("sums");
