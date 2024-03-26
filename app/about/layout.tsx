import { Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { Footer } from "../components";

const layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <Grid container>
      {children}
      <Footer />
    </Grid>
  );
};

export default layout;
