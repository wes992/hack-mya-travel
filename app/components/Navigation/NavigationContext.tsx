"use client";

import React, { createContext, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { types } from "..";
import { usePathname } from "next/navigation";
import { Theme, useMediaQuery } from "@mui/material";

type navProps = {
  selectedPath: string;
  links: types.Link[];
  user: any;
  isMediumScreen?: Boolean;
};
const links = [
  { id: "home", name: "Home", route: "/" },
  { id: "about", name: "About", route: "/about" },
  { id: "posts", name: "Posts", route: "/posts" },
  { id: "creditCards", name: "Credit Cards", route: "/" },
  { id: "highlights", name: "Highlights", route: "/" },
];

const NavContext = createContext<navProps>({
  links,
  user: {},
  selectedPath: "",
});
export const useNavContext = () => useContext(NavContext);

const NavigationContext = ({ children }: any) => {
  const { user } = useUser();
  const selectedPath = usePathname();
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );

  return (
    <NavContext.Provider value={{ selectedPath, user, links, isMediumScreen }}>
      {children}
    </NavContext.Provider>
  );
};

export { NavigationContext };
