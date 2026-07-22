
"use client";

import { AppBar, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";
import { Logo } from "../ui/Logo"; 

export const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          borderBottom: "2px solid black",
          justifyContent: "flex-start",
          px: { xs: 2, md: 3 },
          py: 1,
        }}
      >
        <Logo />
      </Toolbar>

      {!isHome && (
        <Toolbar
          sx={{
            justifyContent: "space-between",
            borderBottom: "2px solid black",
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