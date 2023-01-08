import { createTheme, darken, lighten } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: lighten("#206494", 0.2),
      main: "#206494",
      dark: darken("#206494", 0.2),
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: lighten("#DB1B5E", 0.2),
      main: "#DB1B5E",
      dark: darken("#DB1B5E", 0.2),
      contrastText: "#FFFFFF",
    },
    grey: {
      A400: "#666666",
    },
    info: {
      light: "#ff7961",
      main: "#EEEEEE",
      dark: "#ba000d",
      contrastText: "#666666",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      xxl: 1920,
    },
  },
});
