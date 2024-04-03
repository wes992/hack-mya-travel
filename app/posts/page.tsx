import React from "react";
import { getPosts } from "@/lib/data";
import { NoContent, Posts } from "@/app/components";
import { Container, Typography } from "@mui/material";

export const revalidate = 60;

export default async function PostsPage() {
  const posts = await getPosts();

  if (posts.length < 1) {
    return (
      <NoContent
        title={"There are no posts here."}
        path={"/dashboard/posts/add"}
      />
    );
  }

  return <Posts key={Math.random()} posts={posts} />;
}
