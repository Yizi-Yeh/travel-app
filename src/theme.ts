import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans TC", "Noto Sans JP", sans-serif',
  },
  shape: { borderRadius: 12 },
  palette: {
    mode: "light",
    primary: { main: "#2E4A44", contrastText: "#F7F5F0" },
    secondary: { main: "#5F7A73" },
    background: { default: "#F4F2EE", paper: "#FAF9F7" },
    text: { primary: "#1F2A28", secondary: "#4B5C58" },
    divider: "#E3E0DA",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F4F2EE",
          backgroundImage:
            "radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,0.7), transparent 60%)," +
            "radial-gradient(900px 500px at 90% -20%, rgba(255,255,255,0.55), transparent 60%)," +
            "linear-gradient(180deg, #F4F2EE 0%, #F1EEE8 100%)",
          color: "#1F2A28",
        },
        "*::selection": {
          backgroundColor: "#C7D7D1",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FAF9F7",
          color: "#1F2A28",
          boxShadow: "0 2px 12px rgba(31,42,40,0.08)",
          borderBottom: "1px solid #E3E0DA",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FAF9F7",
          borderRight: "1px solid #E3E0DA",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E3E0DA",
          boxShadow: "0 6px 20px rgba(31,42,40,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          boxShadow: "0 6px 16px rgba(46,74,68,0.2)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
        },
        notchedOutline: {
          borderColor: "#DED9D2",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E3E0DA",
        },
      },
    },
  },
});
