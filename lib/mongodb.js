import mongoose from "mongoose";
import dotenv from "dotenv";


const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options if needed
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

const disconnectMongoDB = async () => {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

export { mongoose, connectMongoDB, disconnectMongoDB };

