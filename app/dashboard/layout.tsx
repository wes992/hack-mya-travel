import React, { ReactNode } from "react";
import { BottomNavigation, BottomNavigationAction, Grid } from "@mui/material";
import { getSession } from "@auth0/nextjs-auth0";
import { upsertUser, getUserByEmail } from "@/lib/actions";
import Sidebar from "./(nav)/sidebar/sidebar";
import Navbar from "./(nav)/navbar/navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { menuItems } from "./(nav)/utils";
import { BottomNavbar } from "./(nav)";

const Layout = withPageAuthRequired(
  //@ts-ignore
  async ({ children }: { children: ReactNode | ReactNode[] }) => {
    const result: any = await getSession();

    if (result?.user) {
      await upsertUser(result.user);
    }

    const DBUser = await getUserByEmail(result?.user?.email);

    return (
      <Grid
        container
        mt={-2}
        gap={2}
        pt={4}
        px={2}
        sx={{
          height: "calc(100vh - 64px)",
        }}
      >
        <Grid
          item
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Sidebar user={DBUser} />
        </Grid>

        <Grid item container flex={4} gap={2}>
          <Navbar />
          {children}
          <Grid
            item
            sx={{
              flex: 1,
              display: { xs: "flex", md: "none" },
              mx: -2,
            }}
          >
            <BottomNavbar />
          </Grid>
        </Grid>
      </Grid>
    );
  },
  { returnTo: "/dashboard" }
);

export default Layout;
