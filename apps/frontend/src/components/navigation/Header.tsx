
"use client";

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Menu } from "lucide-react"; 
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu"; 

import { useThemeStore } from "../../../src/store/themeStore";

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "divider",
          boxShadow: "none",
          backgroundImage: "none",
        }}
      >
        {/* logo */}
        <Toolbar
          sx={{
            borderBottom: 2,
            borderColor: "divider",
            justifyContent: "space-between",
            px: { xs: 2, md: 3 },
            py: 0,
          }}
        >
          <Logo />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <ThemeToggle onToggle={toggleTheme} />
            </Box>

            {/*burger button*/}
            <IconButton
              onClick={() => setIsMobileMenuOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                borderRadius: 0,
                border: 1,
                borderColor: "divider",
                color: "text.primary",
                p: 0,
                "&:hover": { bgcolor: "action.hover" },
              }}
              aria-label="open drawer"
            >
              <Menu size={26} strokeWidth={1} />
            </IconButton>
          </Box>
        </Toolbar>

        {/* desctop menu */}
        {!isHome && (
          <Toolbar
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              borderBottom: 2,
              borderColor: "divider",
              px: { xs: 2, md: 3 },
              alignItems: "stretch",
              minHeight: "38px !important",
            }}
          >
            <DesktopNav isHome={isHome} />
            <HeaderActions />
          </Toolbar>
        )}
      </AppBar>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isHome={isHome}
      />
    </>
  );
};