"use client";
import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";

const Hero = ({ hero }: any) => {
  //TODO: type this
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
          {hero?.tags?.[0] || "Travel Blog"}
        </Typography>
        <Typography variant="h2" fontWeight={500}>
          {hero?.tags?.[1] || "Going Places"}
        </Typography>
        <Typography variant="body1" fontSize={"1.2rem"}>
          {hero?.tags?.[2] ||
            "I haven’t been everywhere, but it’s on my list!!!!"}
        </Typography>
      </Grid>
      <Box sx={{ zIndex: -1 }}>
        <Image
          src={hero?.image?.img?.data}
          alt={hero?.image?.desc}
          fill
          objectFit="cover"
        />
      </Box>
    </Grid>
  );
};

export { Hero };
