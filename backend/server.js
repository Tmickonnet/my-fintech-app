const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({ message: "User registered" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
