import { Menu, MenuItem } from "@mui/material";
import React from "react";

const Popup = ({ anchorEl, open, handleClose, children }: any) => {
  //TODO: type these props
  return (
    <Menu
      id="actions-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "post-actions",
      }}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      {children}
    </Menu>
  );
};

export { Popup };
