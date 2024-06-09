import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Grid } from "@mui/material";
// import theme from "@/app/theme";
import { Footer, Navbar } from "./components";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import theme from "./theme";
import Loading from "@/Loading";

export const metadata: Metadata = {
  title: "Hack Mya Travel",
  description:
    "A blog about travelling. What I have learned, what I have done and the cards that helped make it possible",
};

export const revalidate = 3600;
export const SHOW_COFFEE = true;

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
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </Grid>
              {/* <Footer /> */}
              {SHOW_COFFEE && (
                <script
                  data-name="BMC-Widget"
                  data-cfasync="false"
                  src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
                  data-id="HackMyaTravel"
                  data-description="Support me on Buy me a coffee!"
                  data-message="If you find my content helpful, please consider buying me a coffee."
                  data-color="#FF813F"
                  data-position="Right"
                  data-x_margin="18"
                  data-y_margin="18"
                ></script>
              )}
            </ThemeProvider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
