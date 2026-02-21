const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load environment variables
dotenv.config();

// Fix MongoDB SRV DNS issues
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// Middlewares
// ======================
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// ======================
// Routes
// ======================

// Test Route
app.get("/", (req, res) => {
  res.send("KrishiMitra AI Backend Running 🚀");
});

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Crop Routes
const cropRoutes = require("./routes/cropRoutes");
app.use("/api/crops", cropRoutes);

// weather Routes
const weatherRoutes = require("./routes/weatherRoutes");
app.use("/api/weather", weatherRoutes);


// Protected Route Example
const protect = require("./middleware/authMiddleware");
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route successfully ✅",
    user: req.user,
  });
});

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect(process.env.MONGO_URI, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
  });
