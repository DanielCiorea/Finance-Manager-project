const express = require("express");
const cors = require("cors");
const database = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/transactions", async (req, res) => {
  const transactions = await database.listTransactions();
  res.json(transactions);
});

app.get("/users", async (req, res) => {
  const users = await database.getBudget();
  res.json(users);
});

app.post("/transactions", async (req, res) => {
  const { description, amount } = req.body;

  await database.createTransaction(description, amount);
  res.json();
});

app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;

  await database.modifyTransaction(id, description, amount);
  res.json();
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { budget } = req.body;

  await database.modifyBudget(id, budget);
  res.json();
});

app.delete("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  await database.deleteTransaction(id);
  res.json();
});

app.listen(8080);
