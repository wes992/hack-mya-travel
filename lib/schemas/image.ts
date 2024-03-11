import { Schema } from "mongoose";

export const ImageSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  desc: {
    type: String,
  },
  img: {
    data: String,
    contentType: String,
  },
});
