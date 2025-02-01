const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectDB;
