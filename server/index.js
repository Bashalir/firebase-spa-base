require("dotenv").config();
const express = require("express");
const verifyToken = require("./middleware/verify_token");
const cors = require("cors");
const server = express();

server.use(cors());
server.use("/api/auth", verifyToken);

// Route publique
server.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// Route privée
server.get("/api/auth", async (req, res) => {
  const { uid } = req.body;
  if (uid) {
    res.json({ message: "OK", uid });
  } else {
    res.json({ message: "NOPE" });
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});
