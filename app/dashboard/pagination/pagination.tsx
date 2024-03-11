import { Button, Grid } from "@mui/material";
import React from "react";

const Pagination = () => {
  return (
    <Grid container p={1} justifyContent={"space-between"}>
      <Button>Previous</Button>
      <Button>Next</Button>
    </Grid>
  );
};

export default Pagination;
