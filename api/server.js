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
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 4);
  await database.createUser(name, email, hashedPassword);
  res.json();
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
  // password included in token?
  const token = accessToken.createAccessToken(user);
  res.json({ token, user });
});

app.get("/users", async (req, res) => {
  const users = await database.getBudget(1);
  res.json(users);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { budget } = req.body;

  await database.modifyBudget(id, budget);
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

// modify not used
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
