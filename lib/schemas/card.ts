import { Schema } from "mongoose";
import { Image } from "../models";

export const CardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    subtitle: {
      type: String,
    },
    photo: { type: Schema.Types.ObjectId, ref: "Image" },
    highlights: {
      type: [String],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Ensure only one featured item
CardSchema.index(
  { isFeatured: 1 },
  { unique: true, partialFilterExpression: { isFeatured: true } }
);

CardSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getQuery());

  const imageId = doc.coverPhoto;
  try {
    await Image.findByIdAndDelete(imageId);
    next();
  } catch (err: any) {
    next(err);
  }
});
