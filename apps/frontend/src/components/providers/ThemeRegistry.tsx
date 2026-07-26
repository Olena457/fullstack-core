"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { getAppTheme } from "../../../src/theme/theme";
import { useThemeStore } from "../../../src/store/themeStore";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useThemeStore((state) => state.mode);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const theme = getAppTheme(isMounted ? mode : "light");

  if (!isMounted) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ visibility: "hidden" }}>{children}</div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
