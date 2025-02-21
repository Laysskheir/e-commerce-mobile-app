// config/db.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fashion_store",
      {
        // Add connection options to prevent timeout
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        retryWrites: true,
        w: "majority",
      }
    );
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(
      `Database name: ${
        conn.connection.db ? conn.connection.db.databaseName : "N/A"
      }`
    );
  } catch (error) {
    console.error("❌ MongoDB connection FAILED:", error);
    // Exit the process with a failure code
    process.exit(1);
  }
};

export default connectDB;
