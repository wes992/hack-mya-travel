import { Grid, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Grid container mt={2} p={2} borderRadius={2} gap={2} height={"50vh"}>
      {/* //TODO: Remove bgcolor */}
      <Typography variant={"h4"} className="">
        Nothing here yet, click a link to see the items
      </Typography>
    </Grid>
  );
};

export default Dashboard;
