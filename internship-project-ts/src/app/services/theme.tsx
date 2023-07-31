import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";

const axelor = {
  colors: {
    blue: "rgba(41, 56, 71)",
    grey: "rgba(158, 158, 158)",
    green: "rgba(62, 207, 142)",
    lightGreen: "rgba(62, 207, 142, 0.1)",
    white: "rgba(255, 255, 255)",
  },
};

interface CustomThemeOptions extends ThemeOptions {
  axelor?: {
    colors: {
      blue: string;
      grey: string;
      green: string;
      lightGreen: string;
      white: string;
    };
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: axelor.colors.blue,
    },
    secondary: {
      light: axelor.colors.lightGreen,
      main: axelor.colors.green,
      contrastText: axelor.colors.white,
    },
  },
  axelor,
} as CustomThemeOptions);

export function Theme({ children }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
