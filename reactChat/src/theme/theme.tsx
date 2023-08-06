import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    primaryAppBar: {
      height: number;
    };
  }
  interface Theme {
    primaryDrawer: {
      width: number;
      closedWidth: number;
    };
  }
  interface Theme {
    secondaryDrawer: {
      width: number;
    };
  }
  interface ThemeOptions {
    primaryAppBar: {
      height: number;
    };
  }
}

export const createMuiTheme = () => {
  let theme = createTheme({
    primaryAppBar: {
      height: 50,
    },
    primaryDrawer: {
      width: 240,
      closedWidth: 70,
    },
    secondaryDrawer: {
      width: 240,
    },
    typography: {
      fontFamily: ["IBM Plex Sans", "sans-serif"].join(","),
    },

    components: {
      MuiAppBar: {
        defaultProps: {
          color: "default",
          elevation: 0,
        },
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};

export default createMuiTheme;
