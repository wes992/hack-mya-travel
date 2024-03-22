"use client";

import React, { MouseEvent, useState } from "react";
import { UserBubble } from "../";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";

const Login = ({ sx = {} }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useUser();

  if (!user) {
    return (
      <Typography
        variant="body1"
        component={Link}
        href="/api/auth/login"
        sx={{
          color: "inherit",
          textDecoration: "none",
          mr: 2,
          ...sx,
        }}
      >
        Login
      </Typography>
    );
  }

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
      >
        <UserBubble user={JSON.parse(JSON.stringify(user))} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography
            component={Link}
            href="/dashboard"
            sx={{ color: "inherit", textDecoration: "none", mr: 2 }}
          >
            Dashboard
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography
            component={Link}
            href="/api/auth/logout"
            sx={{ color: "inherit", textDecoration: "none", mr: 2 }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export { Login };
