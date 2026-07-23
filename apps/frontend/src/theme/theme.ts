import { createTheme, PaletteMode } from "@mui/material/styles";

export const getAppTheme = (mode: PaletteMode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      // Main  color 
      primary: {
        main: isDark ? "#ffffff" : "#000000",
      },
      // Brand color 
      secondary: {
        main: "#FF4500",
      },
      background: {
        default: isDark ? "#0a0a0a" : "#ffffff", // Page background
        paper: isDark ? "#121212" : "#ffffff", // Cards and blocks
      },
      text: {
        primary: isDark ? "#ededed" : "#171717", // Main text
        secondary: isDark ? "#a0a0a0" : "#757575", // Secondary text
      },
      // Divider color
      divider: isDark ? "#333333" : "#000000",
      action: {
        hover: isDark ? "#333333" : "#bdbdbd", // Hover color
        disabledBackground: isDark ? "#555555" : "#e0e0e0", // Disabled buttons
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
