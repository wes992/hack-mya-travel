import { CardMedia, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Highlight from "./Highlight";

const CardDetails = ({ card }: any) => {
  //TODO: type this prop
  return (
    <Grid container p={2} gap={2} bgcolor="#EEE">
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
        <Grid container direction={"row"} textAlign={"center"}>
          {card.highlights.map((hl: string, i: number) => (
            <Highlight key={hl + i} highlight={hl} />
          ))}
        </Grid>
      </Grid>
      <Grid item flex={1} color="warning">
        Some Content here
      </Grid>
    </Grid>
  );
};

export default CardDetails;
