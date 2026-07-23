

"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getAppTheme } from "../../../src/theme/theme";
import { useThemeStore } from "../../../src/store/themeStore"; 

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useThemeStore((state) => state.mode);
  
  const theme = getAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}