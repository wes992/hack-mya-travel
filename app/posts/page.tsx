import React from "react";
import { getPosts } from "@/lib/data";
import { Posts } from "@/app/components";
import { Container, Typography } from "@mui/material";

export const revalidate = 60;

export default async function PostsPage() {
  const posts = await getPosts();

  if (!posts) {
    return (
      <Container sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4">Sorry, there are no posts here yet</Typography>
      </Container>
    );
  }

  return <Posts key={Math.random()} posts={posts} />;
}
