import React, { ReactNode } from "react";
import { Grid } from "@mui/material";
import { getSession } from "@auth0/nextjs-auth0";
import { upsertUser, getUserByEmail } from "@/lib/actions";
import Sidebar from "./sidebar/sidebar";
import Navbar from "./navbar/navbar";

const Layout = async ({ children }: { children: ReactNode | ReactNode[] }) => {
  const result: any = await getSession();

  if (result?.user) {
    await upsertUser(result.user);
  }

  const DBUser = await getUserByEmail(result?.user?.email);

  return (
    <Grid container mt={-2} gap={2} pt={4}>
      <Grid item flex={1}>
        <Sidebar user={DBUser} />
      </Grid>

      <Grid item container flex={4} px={2} gap={2}>
        <Navbar />
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
