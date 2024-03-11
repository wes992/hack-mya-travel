import { Schema } from "mongoose";
import { AvatarSchema } from "./avatar";

export const HeroSchema = new Schema({
  image: {
    type: AvatarSchema,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});
