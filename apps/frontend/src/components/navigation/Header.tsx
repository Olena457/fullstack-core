


"use client";

import { AppBar, Toolbar, Typography,Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { HeaderActions } from "./HeaderActions";

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
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            ALTER
            <Box component="span" sx={{ color: "#FF4500" }}>
              EGO
            </Box>
          </Typography>
        </Link>
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
