const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log("MongoDB connect successfully");
    return mongoose.connection;
  } catch (error) {
    console.log("error in mongoose", error);
    throw error;
  }
};

module.exports = connectDB;