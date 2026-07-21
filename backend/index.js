require("dotenv").config();  // Load environment variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ NOT CONNECTED TO MONGODB", err);
    process.exit(1); // Exit the app if connection fails
  });

// Routes
app.use("/", Routes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
