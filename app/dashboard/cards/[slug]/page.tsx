import { Grid } from "@mui/material";
import React from "react";
import { AddCard } from "../add/AddCard";
import { getCard } from "@/lib/data";

const CardDetailsPage = async ({ params }: any) => {
  const { slug } = params;
  const card = await getCard({ slug });

  return (
    <Grid container gap={2}>
      <Grid container item>
        <AddCard
          card={{
            ...card,
            highlights: card?.highlights.map((h: string) => ({ value: h })),
          }}
          editing={false}
        />
      </Grid>
    </Grid>
  );
};

export default CardDetailsPage;
