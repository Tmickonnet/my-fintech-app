const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let users = [];
let wallets = [];

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// register
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  const user = { id: uuidv4(), email, password };
  users.push(user);

  wallets.push({ userId: user.id, balance: 0 });

  res.json({ message: "User created", user });
});

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(400).json({ error: "Invalid login" });

  res.json({ user });
});

// wallet
app.get("/wallet/:userId", (req, res) => {
  const wallet = wallets.find(w => w.userId === req.params.userId);
  res.json(wallet);
});

// deposit
app.post("/deposit", (req, res) => {
  const { userId, amount } = req.body;

  const wallet = wallets.find(w => w.userId === userId);
  wallet.balance += amount;

  res.json(wallet);
});

// transfer
app.post("/transfer", (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;

  const sender = wallets.find(w => w.userId === fromUserId);
  const receiver = wallets.find(w => w.userId === toUserId);

  if (sender.balance < amount)
    return res.status(400).json({ error: "Insufficient funds" });

  sender.balance -= amount;
  receiver.balance += amount;

  res.json({ message: "Transfer successful" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
