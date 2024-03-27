import { Schema } from "mongoose";

export const HeroSchema = new Schema({
  image: { type: Schema.Types.ObjectId, ref: "Image" },

  tags: {
    type: Array,
    required: true,
  },
});
