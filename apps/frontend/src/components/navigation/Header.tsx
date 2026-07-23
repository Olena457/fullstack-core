
"use client";

import { AppBar, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "./ThemeToggle";

import { useThemeStore } from "../../../src/store/themeStore";

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "none",
        backgroundImage: "none",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: 2,
          borderColor: "divider",
          justifyContent: "space-between",
          px: { xs: 2, md: 3 },
          py: 1,
        }}
      >
        <Logo />
        <ThemeToggle onToggle={toggleTheme} />
      </Toolbar>

      {!isHome && (
        <Toolbar
          sx={{
            justifyContent: "space-between",
            borderBottom: 2,
            borderColor: "divider",
            py: 0,
            px: { xs: 2, md: 3 },
            minHeight: "auto !important",
          }}
        >
          <DesktopNav isHome={isHome} />
          <HeaderActions />
        </Toolbar>
      )}
    </AppBar>
  );
};
