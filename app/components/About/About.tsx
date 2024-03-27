import { CardMedia, Grid, Typography, Container } from "@mui/material";
import Image from "next/image";
import React from "react";

type AboutProps = {
  content: string;
  photo: any;
};

const About = ({ content, photo }: AboutProps) => {
  return (
    <Container
      sx={{
        display: { xs: "flex", md: "block" },
        flexDirection: "column",
        textAlign: { xs: "center", md: "left" },
        mb: 4,
      }}
    >
      <Container disableGutters>
        <Typography variant="h3" py={4}>
          About
        </Typography>
      </Container>
      <Grid
        container
        item
        sx={{
          alignItems: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
          overflow: "hidden",
        }}
        gap={8}
      >
        <Grid item sx={{ flex: 1 }}>
          <Typography variant="body1">{content}</Typography>
        </Grid>
        <Grid
          item
          sx={{
            flex: 1,
            overflow: "hidden",
          }}
        >
          <Image
            width={400}
            height={400}
            src={photo?.img?.data}
            alt={photo?.desc || "picture of me"}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export { About };
