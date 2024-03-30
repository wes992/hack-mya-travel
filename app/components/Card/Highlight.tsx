import { haveCommonItems } from "@/app/common/utils";
import { Stack, Typography } from "@mui/material";
import React from "react";

const Highlight = ({ highlight }: any) => {
  const iconMapping = {
    hotel: ["hotel", "hotels", "lodging"],
    airfare: ["plane", "airfare", "airlines", "airline"],
    resturaunt: ["resturaunt", "resturaunts", "food"],
  };

  const getIcon = (text: string) => {
    const splitText = text.toLowerCase().split(" ");
    if (haveCommonItems(splitText, iconMapping.hotel)) {
      return "HOUSE";
    }
    if (haveCommonItems(splitText, iconMapping.airfare)) {
      return "PLANE";
    }
    if (haveCommonItems(splitText, iconMapping.resturaunt)) {
      return "FORK";
    }
    return "Nada";
  };

  return (
    <Stack flex={1}>
      <Typography variant="body1" fontWeight="medium" color="primary.light">
        {getIcon(highlight)}
      </Typography>
      <Typography variant="body1" fontWeight="medium" color="primary.light">
        {highlight}
      </Typography>
    </Stack>
  );
};

export default Highlight;
