import { Schema } from "mongoose";
import { RichTextSchema } from "./richText";

export const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    subtitle: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: RichTextSchema,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    coverPhoto: { type: Schema.Types.ObjectId, ref: "Image" },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);
