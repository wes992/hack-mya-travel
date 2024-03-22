import mongoose from "mongoose";
import { IUser, IPost } from "../interfaces";
import {
  UserSchema,
  PostSchema,
  HeroSchema,
  AboutMeSchema,
  ImageSchema,
} from "../schemas";

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

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export const Hero = mongoose.models.Hero || mongoose.model("Hero", HeroSchema);

export const AboutMe =
  mongoose.models.AboutMe || mongoose.model("AboutMe", AboutMeSchema);

export const Image =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);
