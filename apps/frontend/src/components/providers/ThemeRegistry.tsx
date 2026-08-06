
"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getAppTheme } from "../../../src/theme/theme";
import { useThemeStore } from "../../../src/store/themeStore";
import { useStore } from "../../../src/hooks/useStore"; 

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useStore(useThemeStore, (state) => state.mode);

  const theme = getAppTheme(mode || "light");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}