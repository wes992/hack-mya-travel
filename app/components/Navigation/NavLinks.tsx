"use client";
import { useTheme, List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { types } from "..";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ links, sx }: types.NavLinksProps) => {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      sx={{ flexGrow: 4, ...sx }}
    >
      {links.map((link) => (
        <ListItemButton
          LinkComponent={Link}
          key={link.id}
          selected={pathname === link.route}
          href={link.route}
          sx={{ textAlign: "center" }}
        >
          <ListItemText
            primary={link.name}
            // sx={{ textTransform: "uppercase" }}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export { NavLinks };
