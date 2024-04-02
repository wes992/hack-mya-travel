import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { NavLinks } from ".";
import { Login } from "..";
import { NavDrawer } from "./NavDrawer";
import { NavigationContext } from "./NavigationContext";

const Navbar = () => {
  return (
    <NavigationContext>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <NavDrawer
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            />
            <NavLinks
              sx={{ display: { xs: "none", md: "flex" }, maxWidth: 500 }}
            />

            <Login sx={{ ml: "auto" }} />
          </Toolbar>
        </AppBar>
      </Box>
    </NavigationContext>
  );
};

export { Navbar };
