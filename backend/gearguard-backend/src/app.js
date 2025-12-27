const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/requests", require("./routes/request.routes"));

app.get("/", (req, res) => {
  res.json({ message: "GearGuard Backend Running" });
});

module.exports = app;
