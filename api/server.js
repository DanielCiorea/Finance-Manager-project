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

app.delete("/entries/:id", async (req, res) => {
  const { id } = req.params;
  await database.deleteEntry(id);
  res.json();
});

app.listen(8080);
