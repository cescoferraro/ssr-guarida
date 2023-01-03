import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#007bff",
      main: "#2F89D1",
      dark: "#243F71",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#CE4E48",
      dark: "#ba000d",
      contrastText: "#fff",
    },
    info: {
      light: "#ff7961",
      main: "#EEEEEE",
      dark: "#ba000d",
      contrastText: "#666666",
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
      xxl: 2000,
    },
  },
});
