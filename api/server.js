const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const database = require("./database");
const accessToken = require("./accessToken");
const authMiddleware = require("./authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signUp", async (req, res) => {
  const { name, email, password, budget } = req.body;
  const hashedPassword = await bcrypt.hash(password, 4);

  try {
    await database.createUser(name, email, hashedPassword, budget);
    res.json();
  } catch (err) {
    res.status(400).json({ error: "Email..." });
  }
});

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  const user = await database.findUsersByEmail(email);
  if (!user) {
    res.status(401).json({ message: "Email not found." });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Wrong password." });
    return;
  }

  const token = accessToken.createAccessToken(user);
  res.json({ token, user });
});

app.get("/users", authMiddleware, async (req, res) => {
  const id = await database.getBudget(req.user.id);
  res.json(id);
});

app.put("/users/:id", authMiddleware, async (req, res) => {
  const { budget } = req.body;

  await database.modifyBudget(req.user.id, budget);
  res.json();
});

/******************  TRANSACTIONS *******************/

app.post("/transactions", authMiddleware, async (req, res) => {
  const { description, amount } = req.body;
  await database.createTransaction(req.user.id, description, amount);
  res.json();
});

app.get("/transactions", authMiddleware, async (req, res) => {
  const transactions = await database.listTransactions(req.user.id);
  res.json(transactions);
});

app.put("/transactions/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;

  await database.modifyTransaction(req.user.id, id, description, amount);
  res.json();
});

app.delete("/transactions/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  await database.deleteTransaction(req.user.id, id);
  res.json();
});

app.listen(8080);
