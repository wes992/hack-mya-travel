import { Schema } from "mongoose";
import { RichTextSchema } from "./richText";
import { Image } from "../models";

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

PostSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());

  const imageId = doc.coverPhoto;
  try {
    await Image.findByIdAndDelete(imageId);
    next();
  } catch (err: any) {
    next(err);
  }
});
