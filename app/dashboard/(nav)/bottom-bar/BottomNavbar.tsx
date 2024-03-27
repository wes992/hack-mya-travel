"use client";

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React from "react";
import { menuItems } from "../utils";
import { useRouter } from "next/navigation";

const BottomNavbar = ({}) => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ width: "100%", mt: "auto" }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {menuItems.map((item) => (
          <BottomNavigationAction
            key={item.title}
            label={item.title}
            icon={item.icon}
            onClick={() => router.push(item.path)}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export { BottomNavbar };
