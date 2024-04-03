import React from "react";
import { getCards } from "@/lib/data";
import { Grid } from "@mui/material";
import { Card, NoContent } from "../components";

const CreditCards = async () => {
  const cards = await getCards();

  if (cards.length < 1) {
    return (
      <NoContent
        title="There are no cards here."
        path={"/dashboard/cards/add"}
      />
    );
  }
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
