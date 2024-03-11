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
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserBubble } from "../../components";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: <GroupIcon />,
  },
  {
    title: "Posts",
    path: "/dashboard/posts",
    icon: <ArticleIcon />,
  },
  {
    title: "Credit Cards",
    path: "/dashboard/cards",
    icon: <CreditCardIcon />,
  },
];

const Sidebar = ({ user }: any) => {
  //TODO: Type this prop
  const pathname = usePathname();

  return (
    <Grid container direction={"column"}>
      <Grid container gap={2} mb={2} pl={2} alignItems={"center"}>
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
      <Button
        variant="text"
        // variant="outlined"
        startIcon={<LogoutIcon />}
        sx={{ mx: 2 }}
      >
        Logout
      </Button>
    </Grid>
  );
};

export default Sidebar;
