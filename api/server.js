const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("./database");

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
  console.log(user);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Wrong password." });
    return;
  }
  // password included in token?
  const token = jwt.sign({ user });
  console.log(token);
  res.json({ token, user });
});

app.get("/users", async (req, res) => {
  const users = await database.getBudget();
  res.json(users);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { budget } = req.body;

  await database.modifyBudget(id, budget);
  res.json();
});

/******************  TRANSACTIONS *******************/

app.post("/transactions", async (req, res) => {
  const { userId, description, amount } = req.body;

  await database.createTransaction(userId, description, amount);
  res.json();
});

app.get("/transactions", async (req, res) => {
  const transactions = await database.listTransactions(1);
  res.json(transactions);
});

// modify not used
app.put("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const { description, amount } = req.body;

  await database.modifyTransaction(id, description, amount);
  res.json();
});

app.delete("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  await database.deleteTransaction(id);
  res.json();
});

app.listen(8080);
