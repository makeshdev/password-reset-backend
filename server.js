require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://password-reset-frontend-ten.vercel.app",
      "http://localhost:3000",
      "https://www.postman.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If you're using cookies or any credentials
  })
);

app.use(express.json());
// Database connection
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
