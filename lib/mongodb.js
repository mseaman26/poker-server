import mongoose from "mongoose";




const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Other options if needed
    });
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

const disconnectMongoDB = async () => {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

export { mongoose, connectMongoDB, disconnectMongoDB };

