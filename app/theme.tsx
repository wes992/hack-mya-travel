"use client";
import { Noto_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const noto = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

//TODO: get dark/light modes working
// export const GetTheme = () => {
//   const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

//   return React.useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: prefersDarkMode ? "dark" : "light",
//         },
//         typography: {
//           fontFamily: noto.style.fontFamily,
//         },
//       }),
//     [prefersDarkMode]
//   );
// };

const theme = createTheme({
  typography: {
    fontFamily: noto.style.fontFamily,
  },
});

export default theme;
