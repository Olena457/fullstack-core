"use client";

import { IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MenuButtonProps {
  children: React.ReactNode;
  href: string;
}

export const MenuButton = ({ children, href }: MenuButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <IconButton
        sx={{
          borderRadius: 0,
          px: 2,
          mr:1,
         height: "100%",
          color: "text.primary",
          bgcolor: isActive ? "action.selected" : "transparent",
          "&:hover": {
            bgcolor: isActive ? "action.selected" : "action.hover",
          },
        }}
      >
        <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>
          {children}
        </Typography>
      </IconButton>
    </Link>
  );
};
