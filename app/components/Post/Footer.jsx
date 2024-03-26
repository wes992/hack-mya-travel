import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { ShareOnSocials } from "../Socials/ShareOnSocials";

const Footer = ({ post }) => {
  const { category = "Travel", title = "A great title" } = post;
  return (
    <Grid container>
      <Divider
        width={"100%"}
        sx={(theme) => ({ color: theme.palette.text.primary })}
      />

      <Grid
        container
        px={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item>
          <ShareOnSocials title={title} url={post.route} />
        </Grid>
        <Typography variant="body1">{category}</Typography>
      </Grid>
      <Divider width={"100%"} />
    </Grid>
  );
};

export { Footer };
