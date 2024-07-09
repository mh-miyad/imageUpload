import mongoose from "mongoose";

const dbConfig = async () => {
  if (mongoose.connections[0].readyState) return; // Use existing database connection

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "uploadDb",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default dbConfig;
