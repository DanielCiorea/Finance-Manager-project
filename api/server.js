const express = require("express");
const cors = require("cors");
const database = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/entries", async (req, res) => {
  const entries = await database.listEntries();
  res.json(entries);
});

app.get("/users", async (req, res) => {
  const users = await database.getBudget();
  res.json(users);
});

app.post("/entries", async (req, res) => {
  const { description, amount } = req.body;

  await database.createEntry(description, amount);
  res.json();
});

app.put("/entries/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;

  await database.modifyEntry(id, description, amount);
  res.json();
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { budget } = req.body;

  await database.modifyBudget(id, budget);
  res.json();
});

app.delete("/entries/:id", async (req, res) => {
  const { id } = req.params;
  await database.deleteEntry(id);
  res.json();
});

app.listen(8080);
