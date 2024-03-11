import { CardMedia, Grid, Typography, Container } from "@mui/material";
import React from "react";
import { Footer } from "./Footer";

type AboutProps = {
  content: string;
  photo: any;
};

const About = ({ content, photo }: AboutProps) => {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: { xs: "flex", md: "block" },
          flexDirection: "column",
          textAlign: { xs: "center", md: "left" },
          mb: 4,
        }}
      >
        <Container maxWidth="md" disableGutters>
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
          }}
          gap={8}
        >
          <Grid item sx={{ flex: 1 }}>
            <Typography variant="body1">{content}</Typography>
          </Grid>
          <Grid item sx={{ flex: 1, height: 400, overflow: "hidden" }}>
            <CardMedia
              component="img"
              width={"100%"}
              src={photo?.img?.data}
              alt={photo?.desc || "picture of me"}
              sx={{
                transition: "all .2s ease",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export { About };
