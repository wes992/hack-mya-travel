import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

type NoContentProps = {
  title: string;
  path: string;
};

const NoContent = ({ title, path }: NoContentProps) => {
  return (
    <Grid
      container
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
      gap={2}
      height={"80vh"}
    >
      <Typography variant="h5">{title}</Typography>
      <Button variant="contained" color="warning" component={Link} href={path}>
        {`Add some`}
      </Button>
    </Grid>
  );
};

export { NoContent };
