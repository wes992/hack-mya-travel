"use client";

import {
  AppBar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { NavLinks } from ".";
import { types } from "..";
import MenuIcon from "@mui/icons-material/Menu";
import { Socials } from "../Socials";
import NextLink from "next/link";
import { UserBubble } from "./UserBubble";
import { useUser } from "@auth0/nextjs-auth0/client";

const links: types.Link[] = [
  { id: "home", name: "Home", route: "/" },
  { id: "about", name: "About", route: "/about" },
  { id: "posts", name: "Posts", route: "/posts" },
  { id: "creditCards", name: "Credit Cards", route: "/" },
  { id: "highlights", name: "Highlights", route: "/" },
];

const Navbar = () => {
  const { user, error, isLoading } = useUser();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {links.map((page) => (
              <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                <Link component={NextLink} textAlign="center" href={page.route}>
                  {page.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
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
          {user && <UserBubble user={JSON.parse(JSON.stringify(user))} />}
          <a href="/api/auth/logout">Logout</a>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Navbar };
