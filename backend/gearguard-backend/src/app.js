const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const requestRoutes = require("./routes/requests.routes");
const equipmentRoutes = require("./routes/equipment.routes");

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/equipment", equipmentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GearGuard Backend Running" });
});

module.exports = app;
