import React from "react";

import { getAboutData } from "@/lib/data";
import { About, NoContent } from "@/app/components";

export default async function about() {
  const result = await getAboutData();
  console.log(result);

  if (!result._id) {
    return (
      <NoContent
        title={`There is no "About Me" data here.`}
        path={"/dashboard/about-me"}
      />
    );
  }

  return <About content={result?.content} photo={result?.image} />;
}
