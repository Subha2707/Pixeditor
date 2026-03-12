const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const convertRoutes = require("./routes/convert");
const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* Auth Routes */
app.use("/api/auth", authRoutes);

/* Convert Routes */
app.use("/api", convertRoutes);

/* History Routes */
app.use("/api/history",historyRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* Error Middleware */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});