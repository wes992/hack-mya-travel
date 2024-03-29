import React from "react";
import { getCards } from "@/lib/data";
import { Grid } from "@mui/material";
import { Card } from "../components";

const CreditCards = async () => {
  const cards = await getCards();

  return (
    <Grid container gap={2} mx={2} justifyContent={"center"}>
      {cards.map((card: any) => {
        //TODO: type this

        return <Card key={card._id} card={card} />;
      })}
    </Grid>
  );
};

export default CreditCards;
