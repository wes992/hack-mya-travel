import { Grid } from "@mui/material";
import React from "react";

const CardPost = ({ post }: any) => {
  if (!post) {
    return;
  }
  return (
    <Grid container p={2}>
      <Grid m="auto" dangerouslySetInnerHTML={{ __html: post.html }} />
    </Grid>
  );
};

export { CardPost };
