import { Grid } from "@mui/material";
import React from "react";
import { AddCard } from "../add/AddCard";
import { getCardById } from "@/lib/data";

const CardDetailsPage = async ({ params }: any) => {
  const { id } = params;
  const card = await getCardById(id);

  return (
    <Grid container gap={2}>
      <Grid container item>
        <AddCard
          card={{
            ...card,
            highlights: card.highlights.map((h: string) => ({ value: h })),
          }}
          editing={false}
        />
      </Grid>
    </Grid>
  );
};

export default CardDetailsPage;
