
"use client";

import { Box, Typography } from "@mui/material";
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
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "stretch", 
        alignSelf: "stretch", 
      }}
    >
      {navItems.map((item) => {
        const href = item === "HOME" ? "/" : `/${item.toLowerCase()}`;
        const isActive =
          href === "/" ? pathname === href : pathname.startsWith(href);

        return (
          <Box
            key={item}
            component={Link}
            href={href}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              mr: 1,
              minHeight: "38px",
              height: "100%",
              whiteSpace: "nowrap",
              textDecoration: "none",
              color: "text.primary",
              bgcolor: isActive ? "action.selected" : "transparent",
              transition: "background-color 0.2s ease",
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
                lineHeight: 1,
              }}
            >
              {item}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};