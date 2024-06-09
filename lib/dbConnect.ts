import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = (url: string): typeof mongoose => {
  if (!url) {
    throw new Error(
      "Please define the DB_URL environment variable to connect to DB"
    );
  }

  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.createConnection(url, opts);
  }
  try {
    cached.conn = cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};
