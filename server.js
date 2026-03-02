const express = require("express");
const cors = require("cors");
const decisionRouter = require("./backend/router/decisionRouter");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use(cors());
app.use(express.json());

app.use("/decision", decisionRouter);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});