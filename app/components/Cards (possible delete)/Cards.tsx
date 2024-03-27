import { Grid } from "@mui/material";
import React from "react";

const Cards = ({ cards }) => {
  return (
    <Grid item container gap={2} justifyContent={"center"}>
      {/* {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))} */}
    </Grid>
  );
};

export { Cards };
