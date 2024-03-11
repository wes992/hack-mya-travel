import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  img: string;
  isAdmin: boolean;
  isActive: boolean;
  phone: string;
  name?: string;
}

// Post Schema with ObjectID reference to User
export interface IPost extends Document {
  title: string;
  content: string;
  author: IUser["_id"];
}
