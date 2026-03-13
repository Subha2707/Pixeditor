const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const uploadDir = path.join(process.cwd(), "uploads");
const convertedDir = path.join(process.cwd(), "converted");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

if (!fs.existsSync(convertedDir)) {
  fs.mkdirSync(convertedDir);
}

const convertRoutes = require("./routes/convert");
const authRoutes = require("./routes/auth");
const historyRoutes = require("./routes/history");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pixeditor-app.netlify.app"
    ],
    credentials: true
  })
);
app.use(express.json());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/*Test Route */

app.get("/api", (req, res) => {
  res.json({ message: "API running 🚀" });
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});