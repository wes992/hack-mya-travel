import CardDetails from "@/app/components/Card/CardDetails";
import RelatedPosts from "@/app/components/Card/RelatedPosts";
import { Params } from "@/app/components/types";
import { getCard, getRelatedPosts } from "@/lib/data";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const CreditCardDetails = async ({ params }: Params) => {
  const card = await getCard({ slug: params.slug });

  if (!card) {
    return (
      <Grid container alignItems="center" direction="column" gap={2}>
        <Typography variant="h5"> There is no card here.</Typography>
        <Link href={"/cards"}>
          <Button variant="contained">Go to all Cards</Button>
        </Link>
      </Grid>
    );
  }

  const relatedPosts = (await getRelatedPosts(card?.name)) || [];
  return (
    <>
      <CardDetails card={card} />
      <RelatedPosts posts={JSON.parse(JSON.stringify(relatedPosts))} />
    </>
  );
};

export default CreditCardDetails;
