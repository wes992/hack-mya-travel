"use client";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import React from "react";

import { Facebook, Instagram, Pinterest, X } from "@mui/icons-material";

const Footer = () => {
  const socials = [
    { name: "facebook", icon: <Facebook /> },
    { name: "pinterest", icon: <Pinterest /> },
    { name: "intstagram", icon: <Instagram /> },
    { name: "twitter", icon: <X /> },
  ];

  return (
    <Paper
      sx={(theme) => ({
        mt: 2,
        bgcolor: theme.palette.primary.main,
      })}
      elevation={3}
    >
      <BottomNavigation sx={{ bgcolor: "transparent" }}>
        {socials.map((link, index) => (
          <BottomNavigationAction
            sx={(theme) => ({ color: theme.palette.primary.contrastText })}
            key={link.name}
            label={link.name}
            icon={link.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export { Footer };
