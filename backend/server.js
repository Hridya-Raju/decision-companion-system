const express = require("express");
const cors = require("cors");
const decisionRouter = require("./router/decisionRouter");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/decision", decisionRouter);

app.get("/", (req, res) => {
  res.send("Decision Companion API running");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});