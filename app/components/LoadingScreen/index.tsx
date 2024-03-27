import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const LoadingScreen = ({ title = "" }) => {
  return (
    <Grid
      container
      borderRadius={2}
      direction="column"
      gap={2}
      height={"calc(100vh - 80px)"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h4">{title}</Typography>
      <Image src={"/loadingPlane.gif"} alt="" width={400} height={400} />
    </Grid>
  );
};

export { LoadingScreen };
