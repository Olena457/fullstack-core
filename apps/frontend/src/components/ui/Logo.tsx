
"use client";

import { Typography, Box } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Link
      href="/"
      style={{ textDecoration: "none", color: "inherit", outline: "none" }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          color: isDark ? theme.palette.primary.main : "black",
          transition: "all 0.3s ease-in-out",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, 

          "&:hover, &:focus-visible, &:active": {
            color: theme.palette.secondary.main,
            "& .ego-text": {
              color: isDark ? theme.palette.primary.main : "black",
            },
          },
        }}
      >
        ALTER
        <Box
          component="span"
          className="ego-text"
          sx={{
            color: theme.palette.secondary.main,
            transition: "all 0.3s ease-in-out",
          }}
        >
          EGO
        </Box>
      </Typography>
    </Link>
  );
};
