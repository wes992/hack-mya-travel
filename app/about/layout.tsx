import { Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { Footer } from "../components";

const layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <Grid container>
      {children}
      {/* temorarily commented out until I get links to socials */}
      {/* <Footer /> */}
    </Grid>
  );
};

export default layout;
