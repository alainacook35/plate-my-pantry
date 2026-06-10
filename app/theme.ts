import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFA62B",
    },
    secondary: {
      main: "#16697aff",
      light: "#489fb5ff",
    },
    background: {
      paper: "#EDE7E3"
    }
  },
  typography: {
    fontFamily: "var(--font-noto-sans-display)",
  },
});

export default theme;

// /* CSS HEX */
// --stormy-teal: #16697aff;
// --pacific-blue: #489fb5ff;
// --sky-blue-light: #82c0ccff;
// --parchment: #ede7e3ff;
// --amber-glow: #ffa62bff;

// /* CSS HSL */
// --stormy-teal: hsla(190, 69%, 28%, 1);
// --pacific-blue: hsla(192, 43%, 50%, 1);
// --sky-blue-light: hsla(190, 42%, 65%, 1);
// --parchment: hsla(24, 22%, 91%, 1);
// --amber-glow: hsla(35, 100%, 58%, 1);

// /* SCSS HEX */
// $stormy-teal: #16697aff;
// $pacific-blue: #489fb5ff;
// $sky-blue-light: #82c0ccff;
// $parchment: #ede7e3ff;
// $amber-glow: #ffa62bff;

// /* SCSS HSL */
// $stormy-teal: hsla(190, 69%, 28%, 1);
// $pacific-blue: hsla(192, 43%, 50%, 1);
// $sky-blue-light: hsla(190, 42%, 65%, 1);
// $parchment: hsla(24, 22%, 91%, 1);
// $amber-glow: hsla(35, 100%, 58%, 1);

// /* SCSS RGB */
// $stormy-teal: rgba(22, 105, 122, 1);
// $pacific-blue: rgba(72, 159, 181, 1);
// $sky-blue-light: rgba(130, 192, 204, 1);
// $parchment: rgba(237, 231, 227, 1);
// $amber-glow: rgba(255, 166, 43, 1);

// /* SCSS Gradient */
// $gradient-top: linear-gradient(0deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-right: linear-gradient(90deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-bottom: linear-gradient(180deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-left: linear-gradient(270deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-top-right: linear-gradient(45deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-bottom-right: linear-gradient(135deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-top-left: linear-gradient(225deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-bottom-left: linear-gradient(315deg, #16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);
// $gradient-radial: radial-gradient(#16697aff, #489fb5ff, #82c0ccff, #ede7e3ff, #ffa62bff);