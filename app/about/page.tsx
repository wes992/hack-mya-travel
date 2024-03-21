import React from "react";

import { getAboutData } from "@/lib/data";
import { About } from "@/app/components";
import { Typography } from "@mui/material";

export default async function about() {
  const result = await getAboutData();

  if (!result) return <Typography variant="h5">Nothing to see here</Typography>;

  return <About content={result?.content} photo={result?.image} />;
}
