import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import { Socials } from "../Socials/Socials";

const Footer = () => {
  const socials = ["facebook", "pinterest", "intstagram", "twitter"];

  return (
    <AppBar position="relative" sx={{ mt: 4 }}>
      <Toolbar>
        <Socials />
      </Toolbar>
    </AppBar>
  );
};

export { Footer };
