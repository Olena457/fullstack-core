import { createTheme, PaletteMode } from "@mui/material/styles";

export const getAppTheme = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      // Main  color
      primary: {
        main: isDark ? "#ededed" : "#000000",
      },
      // Brand color
      secondary: {
        main: "#FF4500",
      },
      background: {
        default: isDark ? "#0a0a0a" : "#f5f8fe", // Page background
        paper: isDark ? "#121212" : "#ededed", // Cards and blocks
      },
      text: {
        primary: isDark ? "#ededed" : "#171717", // Main text
        secondary: isDark ? "#a0a0a0" : "#757575", // Secondary text
      },
      // Divider color
      //
      divider: isDark ? "#333333" : "#000000",
      action: {
        hover: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        selected: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.095)",
        disabledBackground: isDark ? "#555555" : "#e0e0e0",
      },
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: "Arial, Helvetica, sans-serif",
    },
  });
};
