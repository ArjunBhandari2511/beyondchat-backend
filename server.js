const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://beyondchat-frontend.vercel.app", // Allow frontend URL
    credentials: true, // Allow cookies & sessions
  })
);

connectDB();

// Routes
app.use("/api", authRoutes);
app.get("/" , (req, res) => {
  res.send("Beyond Chat's Setup.");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
