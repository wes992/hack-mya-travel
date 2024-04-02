"use client";
import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { types } from "..";
import Link from "next/link";
import { useNavContext } from "./NavigationContext";

const NavLinks = ({ sx }: types.NavLinksProps) => {
  const { user, links, selectedPath } = useNavContext();

  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      sx={{
        mx: 2,
        flex: 4,
        ...sx,
      }}
    >
      {links.map((link) => (
        <ListItemButton
          LinkComponent={Link}
          key={link.id}
          selected={
            selectedPath === link.route ||
            selectedPath === `${link.route}/[slug]`
          }
          href={link.route}
          sx={(theme) => ({
            "&.Mui-selected, &.Mui-selected:hover": {
              color: theme.palette.primary.main,
              bgcolor: theme.palette.primary.contrastText,
            },
            "&:hover": {
              transform: "scale(1.01)",
            },
            minWidth: "50px",
            borderRadius: 6,
            py: 0,
            textAlign: "center",
          })}
        >
          <ListItemText primary={link.name} />
        </ListItemButton>
      ))}
    </List>
  );
};

export { NavLinks };
