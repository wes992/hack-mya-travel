"use client";

import React from "react";
import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserBubble } from "../../../components";
import { menuItems } from "../utils";

const Sidebar = ({ user }: any) => {
  //TODO: Type this prop
  const pathname = usePathname();

  return (
    <Grid container direction="column" sx={{}}>
      <Grid container gap={2} mb={2} alignItems={"center"}>
        {user && (
          <UserBubble user={JSON.parse(JSON.stringify(user))} showName />
        )}
      </Grid>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          flex: 1,
          position: "sticky",
          top: 4,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Pages
          </ListSubheader>
        }
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            href={item.path}
            LinkComponent={Link}
            selected={pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Grid>
  );
};

export default Sidebar;
