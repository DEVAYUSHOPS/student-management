require("dotenv").config();
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const connectDB = require("../server/config/db");
const cors = require("cors");

const app = express();
connectDB();
app.use(cors({
  origin: "https://ayushstudentmanagementapp.netlify.app/",
  credentials: true, // only if using cookies/JWT in auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/students", require("./routes/students"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
