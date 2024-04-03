import React from "react";
import { Grid } from "@mui/material";
import { Hero, SpecialPosts } from "./components";
import { getCard, getHero, getRecentPosts } from "@/lib/data";
import { FeaturedCard } from "./components/Special/FeaturedCard";

//TODO: Remove static text

export default async function Home() {
  const hero = await getHero();
  const recentPosts = await getRecentPosts();
  // const featuredCard = await getFeaturedCard();
  const featuredCard = await getCard({ isFeatured: true });
  return (
    <main>
      <Grid container>
        <Hero hero={hero} />
        <Grid container gap={2}>
          <SpecialPosts posts={recentPosts} header="Recent Posts" />

          <FeaturedCard card={featuredCard} />
        </Grid>
      </Grid>
    </main>
  );
}
