"use client";

import React, { createContext, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { types } from "..";

type navProps = {
  links: types.Link[];
  user: any;
};
const links = [
  { id: "home", name: "Home", route: "/" },
  { id: "about", name: "About", route: "/about" },
  { id: "posts", name: "Posts", route: "/posts" },
  { id: "creditCards", name: "Credit Cards", route: "/" },
  { id: "highlights", name: "Highlights", route: "/" },
];

const NavContext = createContext<navProps>({ links, user: {} });
export const useNavContext = () => useContext(NavContext);

const NavigationContext = ({ children }: any) => {
  const { user } = useUser();
  return (
    <NavContext.Provider value={{ user, links }}>
      {children}
    </NavContext.Provider>
  );
};

export { NavigationContext };
