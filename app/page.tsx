import React from "react";
import { Grid } from "@mui/material";
import { Hero, SpecialPosts } from "./components";
import { Cards } from "./components/Special";
import { getHero, getRecentPosts } from "@/lib/data";

//TODO: Remove static text

export default async function Home() {
  const hero = await getHero();
  const recentPosts = await getRecentPosts();
  return (
    <main>
      <Grid container>
        <Hero hero={hero} />
        <Grid container gap={2}>
          <SpecialPosts posts={recentPosts} header="Recent Posts" />

          <Cards cards={[]} header="Featured Card" />
        </Grid>
      </Grid>
    </main>
  );
}
