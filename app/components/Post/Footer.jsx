"use client";

import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Socials } from "../Socials";
import { ShareOnSocials } from "../Socials/ShareOnSocials";

const Footer = ({ post: { category = "Travel", title = "A great title" } }) => {
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
          {/* <Socials iconsOnly /> */}
          <ShareOnSocials title={title} />
        </Grid>
        <Typography variant="body1">{category}</Typography>
      </Grid>
      <Divider width={"100%"} />
    </Grid>
  );
};

export { Footer };
