import { Grid } from "@mui/material";
import React from "react";
import { CardBanner } from "./CardBanner";
import { CardPost } from "./CardPost";

const CardDetails = ({ card }: any) => {
  //TODO: type this prop
  return (
    <Grid container>
      <CardBanner card={card} />
      <CardPost post={card.content} />
    </Grid>
  );
};

export default CardDetails;
