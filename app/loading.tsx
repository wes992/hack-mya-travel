import React from "react";
import { LoadingScreen } from "./components";
import { config } from "./common/config";

const Loading = () => {
  const labels = config.get("labels");

  return <LoadingScreen title={labels!.get("loadingDefault")} />;
};

export default Loading;
