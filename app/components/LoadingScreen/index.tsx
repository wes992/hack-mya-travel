import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const LoadingScreen = ({ title = "" }) => {
  return (
    <Grid
      container
      direction="column"
      gap={2}
      height={"calc(100vh - 80px)"}
      justifyContent={"center"}
      alignItems={"center"}
      px={2}
      textAlign={"center"}
    >
      <Typography variant="h4">{title}</Typography>
      <Image
        unoptimized
        src={"/images/LoadingPlane.gif"}
        alt=""
        width={400}
        height={400}
      />
    </Grid>
  );
};

export { LoadingScreen };
