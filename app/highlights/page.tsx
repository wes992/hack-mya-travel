import React from "react";
import { LoadingScreen } from "../components";
import { config } from "../common/config";

const Highlights = () => {
  const labels = config.get("labels");

  return <LoadingScreen title={labels!.get("loadingWIP")} />;
};

export default Highlights;
