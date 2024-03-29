import { getAboutData } from "@/lib/data";
import React from "react";
import { AboutMe } from "./AboutMe";

const AboutMePage = async ({}) => {
  const myDetails = await getAboutData();

  if (!myDetails) {
    return null;
  }

  return <AboutMe myDetails={myDetails} />;
};

export default AboutMePage;
