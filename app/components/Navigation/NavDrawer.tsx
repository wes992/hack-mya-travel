"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { types } from "..";
import { usePathname } from "next/navigation";

const NavDrawer = ({ links = [], sx }: types.NavLinksProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  return (
    <React.Fragment key={"drawer-left"}>
      <IconButton
        size="large"
        aria-label="Navigation Drawer"
        onClick={toggleDrawer(true)}
        color="inherit"
        sx={sx}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={(theme) => ({
          "& .MuiDrawer-paperAnchorLeft": {
            bgcolor: theme.palette.primary.main,
            top: "64px",
          },
        })}
      >
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {links.map((link) => (
              <ListItem key={link.id} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.route}
                  selected={pathname === link.route}
                  sx={(theme) => ({
                    color: theme.palette.primary.contrastText,
                  })}
                >
                  <ListItemText
                    primary={link.name}
                    sx={(theme) => ({
                      "& > span": {
                        fontSize: "1.1rem",
                        fontWeight: theme.typography.fontWeightMedium,
                      },
                    })}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export { NavDrawer };
