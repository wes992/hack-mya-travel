import React from "react";

import { getAboutData } from "@/lib/data";
import { About } from "@/app/components";

export default async function about() {
  const { content, image } = await getAboutData();

  // return "About Page";
  return <About content={content} photo={image} />;
}

// export default about;
