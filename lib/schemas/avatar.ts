import { Schema } from "mongoose";

export const AvatarSchema = new Schema({
  url: {
    type: String,
  },
  alt: {
    type: String,
  },
});
