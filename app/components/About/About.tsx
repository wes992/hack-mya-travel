import { Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type AboutProps = {
  content: string;
  photo: any;
};

const About = ({ content, photo }: AboutProps) => {
  return (
    <Grid
      container
      sx={{
        flexDirection: { xs: "column", md: "row" },
        textAlign: { xs: "center", md: "left" },
        width: "fit-content",
        mx: "auto",
      }}
    >
      <Box my={2}>
        <Typography variant="h3" px={2}>
          About
        </Typography>
      </Box>

      <Grid
        container
        gap={4}
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Grid item sx={{ flex: 1, px: 2 }}>
          <Typography variant="body1">{content}</Typography>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            width={400}
            height={400}
            src={photo?.img?.data}
            alt={photo?.desc || "picture of me"}
            style={{ objectFit: "contain" }}
          />
        </Grid>
      </Grid>
      {/* <SubscribeNewsletter /> */}
    </Grid>
  );
};

export { About };
