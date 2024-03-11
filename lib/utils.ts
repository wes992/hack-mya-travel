import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const DB_URL = process.env.DB_URL!;
if (!DB_URL) {
  throw new Error("Please define the DB_URL environment variable");
}

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const connectToDB = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }
//   if (!cached.promise) {
//     const opts = {
//       // bufferCommands: false,
//     };
//     cached.promise = await mongoose.connect(DB_URL, opts);
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// };

export const connectToDB = async () => {
  const connection: any = { isConnected: false };
  try {
    if (connection.isConnected) {
      console.log("DB Aleady connected");
      return;
    }
    const db = await mongoose.connect(DB_URL);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the Database ");
  } catch (error: any) {
    console.log("Error connecting to the DB");
    throw new Error(error);
  }
};

export const getSlug = (text: string) => {
  return String(text)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
};
