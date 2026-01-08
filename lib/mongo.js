import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";

if (!MONGODB_URI) throw new Error("Please add Mongo URI");

let isConnected = null;

export const connectDB = async () => {
  if (isConnected) return;
  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState;
};
