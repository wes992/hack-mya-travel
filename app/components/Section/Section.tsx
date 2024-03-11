"use client";

import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

type SectionProps = {
  header: string;
  content: ReactNode | Iterable<ReactNode>;
};

const Section = ({ header, content }: SectionProps) => {
  const theme = useTheme();
  return (
    <Grid container position={"relative"} sx={{ justifyContent: "center" }}>
      <Box
        bgcolor={theme.palette.primary.main}
        width={"100%"}
        height={"150px"}
        position={"absolute"}
        zIndex={-1}
      />
      <Grid display={"flex"} item mt={2}>
        <Grid item container direction={"column"} gap={2}>
          <Typography color={theme.palette.primary.contrastText} variant="h4">
            {header}
          </Typography>
          <Grid item container gap={1}>
            {content}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { Section };
