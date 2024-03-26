"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import Link from "next/link";
import { types } from "..";
import { useNavContext } from "./NavigationContext";

const NavDrawer = ({ sx }: types.NavLinksProps) => {
  const { user, links, selectedPath, isMediumScreen } = useNavContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && isMediumScreen) {
      setOpen(false);
    }
  }, [open, isMediumScreen]);

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
            top: theme.mixins.toolbar.minHeight,
            height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
            justifyContent: "space-between",
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
                  selected={selectedPath === link.route}
                  sx={(theme) => ({
                    "&.Mui-selected, &.Mui-selected:hover": {
                      color: theme.palette.primary.main,
                      bgcolor: theme.palette.primary.contrastText,
                    },
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                    borderRadius: 6,
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
        {user && (
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ width: 250 }}
          >
            <Divider />
            <List>
              <ListItem disablePadding>
                <Button
                  variant="text"
                  component={Link}
                  startIcon={<LogoutIcon />}
                  href="/api/auth/logout"
                  sx={(theme) => ({
                    color: theme.palette.primary.contrastText,
                    mx: 2,
                  })}
                >
                  Logout
                </Button>
              </ListItem>
            </List>
          </Box>
        )}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export { NavDrawer };
