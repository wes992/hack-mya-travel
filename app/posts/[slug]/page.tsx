import { Post } from "@/app/components";
import { getPostBySlug } from "@/lib/data";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default async function Page({ params }: { params: any }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <Grid container alignItems="center" direction="column" gap={2}>
        <Typography variant="h5"> There is no post here.</Typography>
        <Link href={"/posts"}>
          <Button variant="contained">Go to all Posts</Button>
        </Link>
      </Grid>
    );
  }

  return <Post post={{ ...post }} />;
}
