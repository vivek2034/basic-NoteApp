import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://forworkonly3004_db_user:3004@cluster0.nqlc0re.mongodb.net/?appName=Cluster0";

if (!MONGODB_URI) throw new Error("Please add Mongo URI");

let isConnected = null;

export const connectDB = async () => {
  if (isConnected) return;
  const db = await mongoose.connect(MONGODB_URI);
  isConnected = db.connections[0].readyState;
};
