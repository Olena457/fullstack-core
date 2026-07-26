"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

export const DesktopNav = ({ isHome }: { isHome: boolean }) => {
  const pathname = usePathname(); 

  const navItems = ["HOME", "PRODUCTS", "REVIEW"];
  if (isHome) {
    navItems.push("ABOUT");
  }

  return (
    <Box
      sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}
    >
      {navItems.map((item) => {
        const href = item === "HOME" ? "/" : `/${item.toLowerCase()}`;
        
        const isActive = href === "/" 
          ? pathname === href 
          : pathname.startsWith(href);

        return (
          <Link key={item} href={href} style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                borderRadius: 0,
                px: 2, 
                py: 1, 
                color: "text.primary",
                bgcolor: isActive ? "action.selected" : "transparent",
                "&:hover": {
                  bgcolor: isActive ? "action.selected" : "action.hover",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontSize: "16px",
                }}
              >
                {item}
              </Typography>
            </IconButton>
          </Link>
        );
      })}
    </Box>
  );
};