"use client";
import React from "react";
import { CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { types } from "..";

const Hero = ({ hero }: Record<"hero", types.Hero>) => {
  const theme = useTheme();
  return (
    <Grid container item sx={{ height: "80vh" }} position={"relative"} mt={-2}>
      <Grid
        container
        direction="column"
        alignContent={"center"}
        position={"absolute"}
        textAlign={"center"}
        top={"30%"}
        left={"50%"}
        sx={{
          color: theme.palette.primary.contrastText,
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: "60%" },
        }}
      >
        <Typography variant="body1" fontSize={"1.2rem"}>
          {hero?.tags?.[0] || "Travel Blogwwwww"}
        </Typography>
        <Typography variant="h2" fontWeight={500}>
          {hero?.tags?.[1] || "Going Placeswwww"}
        </Typography>
        <Typography variant="body1" fontSize={"1.2rem"}>
          {hero?.tags?.[2] ||
            "I haven’t been everywhere, but it’s on my list!!!!"}
        </Typography>
      </Grid>
      <CardMedia
        component="img"
        sx={{ width: "100%", height: "100%" }}
        src={hero?.image?.url}
        alt={"hero-image"}
      />
    </Grid>
  );
};

export { Hero };
