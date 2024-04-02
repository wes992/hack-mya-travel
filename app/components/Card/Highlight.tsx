import { haveCommonItems } from "@/app/common/utils";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import {
  HotelOutlined,
  FlightOutlined,
  DiningOutlined,
  LocalGroceryStoreOutlined,
  GradeOutlined,
} from "@mui/icons-material";

const Highlight = ({ highlight }: any) => {
  const iconMapping = {
    hotel: ["hotel", "hotels", "lodging"],
    airfare: ["plane", "airfare", "airlines", "airline"],
    resturaunt: ["resturaunt", "resturaunts", "food"],
    grocery: ["groceries", "grocery", "shopping"],
  };

  const getIcon = (text: string) => {
    const splitText = text.toLowerCase().split(" ");
    if (haveCommonItems(splitText, iconMapping.hotel)) {
      return <HotelOutlined />;
    }
    if (haveCommonItems(splitText, iconMapping.airfare)) {
      return <FlightOutlined />;
    }
    if (haveCommonItems(splitText, iconMapping.resturaunt)) {
      return <DiningOutlined />;
    }
    if (haveCommonItems(splitText, iconMapping.grocery)) {
      return <LocalGroceryStoreOutlined />;
    }
    return <GradeOutlined />;
  };

  return (
    <Stack
      flex={1}
      gap={1}
      direction={{ xs: "row", md: "column" }}
      textAlign={"center"}
    >
      <Typography variant="body1" fontWeight="medium" color="primary.light">
        {getIcon(highlight)}
      </Typography>
      <Typography
        variant="body1"
        fontWeight="medium"
        color="primary.light"
        sx={{ textAlign: { xs: "left", md: "center" } }}
      >
        {highlight}
      </Typography>
    </Stack>
  );
};

export default Highlight;
