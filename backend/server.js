const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");

const app = express();
const postRoutes = require("./routes/postRoutes");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");


app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ADD THESE
app.use("/api/upload", uploadRoutes);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Test Route
app.get("/", (req, res) => {
  res.send("Social Media API Running");
});

// Show all users
app.get("/allusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    console.log(
      "DATABASE =",
      mongoose.connection.db.databaseName
    );
  })
  .catch((err) => console.log(err));

// Server
const PORT = 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});