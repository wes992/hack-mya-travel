import React from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";
// import theme from "@/app/theme";
import { Navbar } from "./components";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import theme from "./theme";

export const metadata: Metadata = {
  title: "Hack Mya Travel",
  description:
    "A blog about travelling. What I have learned, what I have done and the cards that helped make it possible",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navbar />
              <Grid container justifyContent={"center"} mt={10}>
                {children}
              </Grid>
            </ThemeProvider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
