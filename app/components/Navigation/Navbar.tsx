import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { NavLinks } from ".";
import { Login, types } from "..";
import { Socials } from "../Socials";
import { NavDrawer } from "./NavDrawer";

const links: types.Link[] = [
  { id: "home", name: "Home", route: "/" },
  { id: "about", name: "About", route: "/about" },
  { id: "posts", name: "Posts", route: "/posts" },
  { id: "creditCards", name: "Credit Cards", route: "/" },
  { id: "highlights", name: "Highlights", route: "/" },
];

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <NavDrawer
            links={links}
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          />
          <NavLinks
            links={links}
            sx={{ display: { xs: "none", md: "flex" } }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "block" },
            }}
          >
            <Socials iconsOnly sx={{ justifyContent: "flex-end" }} />
          </Box>
          <Login sx={{ ml: "auto" }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Navbar };
