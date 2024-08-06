// utils/db.js
const mongoose = require("mongoose");
const { MONGO_URI } = require("../configs/keys.js");

const connectToMongoDB = async () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectToMongoDB;
