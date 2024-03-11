"use client"; // may not need because may not keep the section title in the header

import React from "react";
// import { Search } from "@/app/dashboard/search";
import { Grid, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
// import React, { Suspense } from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
      borderRadius={2}
      height={"fit-content"}
      bgcolor={"#EEE"} //TODO: Remove this
    >
      <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
        {pathname.split("/").pop()}
      </Typography>
      {/* <Suspense fallback={"...dashboard Fallback"}> */}
      {/* <Search /> */}
      {/* </Suspense> */}
    </Grid>
  );
};

export default Navbar;
