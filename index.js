const express = require("express");
const app = express();

const PORT = process.env.PORT || 8081; // Define PORT here

app.get("/", (req, res) => {
  res.send("Hello from Express.js!");
});

app.listen(PORT, () => {
  console.log(`Server is running  on http://localhost:${PORT}`);
});