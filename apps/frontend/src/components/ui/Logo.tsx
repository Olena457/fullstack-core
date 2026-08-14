
"use client";

import { Typography, Box, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { LogoIcon } from "./icons/LogoIcon";

export const Logo = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Link
      href="/"
      style={{ textDecoration: "none", color: "inherit", outline: "none" }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}
      >
        <LogoIcon
          width={isMobile ? 26 : 40}
          height={isMobile ? 26 : 40}
          color={theme.palette.secondary.main}
        />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: isDark ? theme.palette.primary.main : "black",
            transition: "all 0.3s ease-in-out",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            "@media (max-width: 425px)": {
              fontSize: "1.5rem",
            },
            "&:hover, &:focus-visible, &:active": {
              color: theme.palette.secondary.main,
              "& .ego-text": {
                color: isDark ? theme.palette.text.primary : "black",
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
      </Box>
    </Link>
  );
};