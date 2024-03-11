import React from "react";
import { getPosts } from "@/lib/data";
import { Posts } from "@/app/components";

export default async function Page() {
  const posts = await getPosts();

  return <Posts key={Math.random()} posts={posts} />;
}
