import CardDetails from "@/app/components/Card/CardDetails";
import RelatedPosts from "@/app/components/Card/RelatedPosts";
import { Params } from "@/app/components/types";
import { getCard, getRelatedPosts } from "@/lib/data";
import { Button } from "@mui/material";
import React from "react";

const CreditCardDetails = async ({ params }: Params) => {
  const card = await getCard({ slug: params.slug });
  const relatedPosts = await getRelatedPosts(card.name);
  return (
    <>
      <CardDetails card={card} />
      <RelatedPosts posts={JSON.parse(JSON.stringify(relatedPosts))} />
    </>
  );
};

export default CreditCardDetails;
