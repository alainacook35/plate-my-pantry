import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA62B",
    },
    secondary: {
      main: "#489FB5",
    },
    background: {
      paper: "#EDE7E3"
    }
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
});

export default theme;