const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/requests", require("./routes/requests.routes"));

app.get("/", (req, res) => {
  res.json({ message: "GearGuard Backend Running" });
});

module.exports = app;
