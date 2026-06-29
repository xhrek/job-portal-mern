require("dotenv").config();

const dns = require("dns");

// Force Node.js to use Google's and Cloudflare's DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());

// ---------------- Routes ----------------
const authRoutes = require("./routes/authRoutes");
const jobroutes = require("./routes/jobroutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const savedJobRoutes = require("./routes/savedjobroutes");
const companyRoutes = require("./routes/companyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobroutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/companies", companyRoutes);

// ---------------- Test Route ----------------
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "API Working",
  });
});

// ---------------- MongoDB ----------------
async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB Connection Error");
    console.error(err);
  }
}

connectDB();