const express = require("express");
const database = require("./database");

const app = express();
app.use(express.json());

app.get("/entries", async (req, res) => {
  const entries = await database.listEntries();
  res.json(entries);
});

// TODO: ADD ANOTHER PAGE

// app.get("/page2", (req, res) => {
//   res.send("Second page - Test sums db");
// });

app.post("/entries", async (req, res) => {
  const { description, amount } = req.body;

  await database.createEntry(description, amount);
  res.send("A post request from postman, man.");
});

app.listen(8080);
