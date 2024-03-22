"use client";
import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { types } from "..";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavContext } from "./NavigationContext";

const NavLinks = ({ sx }: types.NavLinksProps) => {
  const pathname = usePathname();
  const { user, links } = useNavContext();

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
          <ListItemText primary={link.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export { NavLinks };
