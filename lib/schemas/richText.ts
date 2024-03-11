import { Schema } from "mongoose";
import type { Content } from "@tiptap/core";

export const RichTextSchema = new Schema<Content>({
  uid: { type: String },
  type: { type: String },
  attrs: { type: Object },
  children: { type: Array, default: [] },
  html: { type: String },
});
