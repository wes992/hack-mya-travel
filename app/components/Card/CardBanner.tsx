import { CardMedia, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Highlight from "./Highlight";

const CardBanner = ({ card }: any) => {
  const topHighlights = card.highlights.slice(0, 3);

  return (
    <Grid
      container
      p={2}
      gap={2}
      bgcolor="#EEE"
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid container>
        <Stack>
          <Typography variant="h4" color="primary.dark" fontWeight={"medium"}>
            {card.name}
          </Typography>
          <Typography variant="h6" color="warning.main">
            {card.subtitle}
          </Typography>
        </Stack>
      </Grid>
      <Grid item flex={1}>
        <CardMedia
          sx={{
            position: "relative",
            height: 150,
            width: 225,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Image src={card?.photo?.img?.data} alt={card?.photo?.desc} fill />
        </CardMedia>
      </Grid>
      <Grid item flex={3}>
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          textAlign={"center"}
        >
          {topHighlights.map((hl: string, i: number) => (
            <Highlight key={hl + i} highlight={hl} />
          ))}
        </Grid>
      </Grid>
      <Grid item flex={1}>
        <Typography variant={"body1"} sx={{ color: "warning" }}>
          Some Content here (Ratings?)
        </Typography>
      </Grid>
    </Grid>
  );
};

export { CardBanner };
