import { IUser, IPost } from "../interfaces";
import {
  UserSchema,
  PostSchema,
  HeroSchema,
  AboutMeSchema,
  ImageSchema,
} from "../schemas";
import { CardSchema } from "../schemas/card";
import env from "../environment";
import { dbConnect } from "../dbConnect";

const conn = dbConnect(env.DB_URL);

export const User = conn.models.User || conn.model<IUser>("User", UserSchema);

export const Post = conn.models.Post || conn.model<IPost>("Post", PostSchema);

export const Hero = conn.models.Hero || conn.model("Hero", HeroSchema);

export const AboutMe =
  conn.models.AboutMe || conn.model("AboutMe", AboutMeSchema);

export const Image = conn.models.Image || conn.model("Image", ImageSchema);

export const Card = conn.models.Card || conn.model("Card", CardSchema);
