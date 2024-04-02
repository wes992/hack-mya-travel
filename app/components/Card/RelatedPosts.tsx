"use client";
import { Grid, List, ListItemButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const RelatedPosts = ({ posts }: { posts: any[] }) => {
  const router = useRouter();
  return (
    <Grid container direction="column" ml={4}>
      <Typography variant="body1" color="primary.dark" fontWeight="medium">
        Learn more in these posts
      </Typography>
      <List dense sx={{ listStyle: "inherit" }}>
        {posts.map((post) => (
          <ListItemButton
            component="li"
            key={post._id}
            onClick={() => router.push(`/posts/${post.slug}`)}
            sx={(theme) => ({
              display: "list-item",
              px: 0,
              fontSize: ".8rem",
              fontWeight: theme.typography.fontWeightMedium,
            })}
          >
            {post.title}
          </ListItemButton>
        ))}
      </List>
    </Grid>
  );
};

export default RelatedPosts;
