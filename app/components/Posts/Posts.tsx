import { Container, Grid, Typography } from "@mui/material";
import React from "react";

import { Post } from "../types";
import { BlogCard } from "..";

const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <Grid item container gap={2} justifyContent={"center"}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export { Posts };
