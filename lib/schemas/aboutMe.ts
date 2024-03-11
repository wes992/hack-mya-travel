import { Schema } from "mongoose";

export const AboutMeSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: true,
  },
});
