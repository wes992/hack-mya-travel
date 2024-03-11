import { getPostBySlug } from "@/lib/data";
import { Grid } from "@mui/material";
import React from "react";
import { CreatePost } from "../add/CreatePost";

const PostDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return (
    <Grid container gap={2}>
      <Grid container item>
        <CreatePost post={post} editing={false} />
      </Grid>
    </Grid>
  );
};

export default PostDetailsPage;
