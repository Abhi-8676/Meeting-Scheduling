
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose =require('mongoose');
const fs = require("fs");
const mediaRoutes = require("./routes/media");
require("dotenv").config();

const app = express();


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: "*", // allow your frontend's origin
  credentials: true                // if you use cookies/auth
}));
app.use(express.json());

// Ensure tmp directory exists (works for all OS)
const tmpDir = path.join(__dirname, "tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

// API routes
app.use("/api/media", mediaRoutes);

// Health check
app.get("/", (req, res) => res.send("Media service running"));

// Start server
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Media service running on port ${PORT}`);
});
