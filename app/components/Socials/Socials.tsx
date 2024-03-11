import React from "react";
import { Facebook, Instagram, Pinterest } from "@mui/icons-material";

import { List, Typography, IconButton } from "@mui/material";

const Socials = ({ iconsOnly = false, sx = {} }) => {
  const socials = [
    { name: "facebook", icon: <Facebook /> },
    { name: "pinterest", icon: <Pinterest /> },
    { name: "intstagram", icon: <Instagram /> },
    { name: "twitter", icon: <div /> },
  ];

  return (
    <List
      component="nav"
      aria-label="Social Media Icons"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        ...sx,
      }}
    >
      {socials.map((link, index) => (
        <IconButton
          key={link.name}
          size="large"
          aria-label={`icon for ${link.name}`}
          color="inherit"
          sx={{ justifyContent: "center" }}
        >
          {link.icon}
          {!iconsOnly && (
            <Typography variant="body2" ml={1}>
              {link.name}
            </Typography>
          )}
        </IconButton>
      ))}
    </List>
  );
};

export { Socials };
