import mongoose, { ConnectOptions, Connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined inside .env file");
}

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((m) => m.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
