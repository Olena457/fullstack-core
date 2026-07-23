"use client";

import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

export const DesktopNav = ({ isHome }: { isHome: boolean }) => {
  const navItemStyles = {
    borderRadius: 0,
    px: 2,
    py: 0,
    color: "text.primary", 
    "&:hover": {
      bgcolor: "action.hover", 
    },
  };

  const navItems = ["HOME", "PRODUCTS", "REVIEW"];
  if (isHome) {
    navItems.push("ABOUT");
  }

  return (
    <Box
      sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}
    >
      {navItems.map((item) => (
        <Link
          key={item}
          href={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
          style={{ textDecoration: "none" }}
        >
          <IconButton sx={navItemStyles}>
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
      ))}
    </Box>
  );
};
