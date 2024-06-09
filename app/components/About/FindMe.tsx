import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const FindMe = ({}) => {
  return (
    <Grid container direction="column" alignItems={"center"}>
      <Typography variant="h6">Let's get in touch!</Typography>
      <Grid item display={"flex"}>
        <Typography>Instagram:&nbsp;</Typography>
        <Link target="_blank" href="#">
          @hackmyatravel
        </Link>
      </Grid>
      <Grid item display={"flex"}>
        <Typography>Email:&nbsp;</Typography>
        <Link target="email" href="#">
          hackmyatravel@gmail.com
        </Link>
      </Grid>
    </Grid>
  );
};

export { FindMe };
