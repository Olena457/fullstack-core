"use client";

import { Box, Typography, useTheme } from "@mui/material";

interface ThemeToggleProps {
  onToggle?: () => void;
}

export const ThemeToggle = ({ onToggle }: ThemeToggleProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        border: 1,
        borderColor: "divider",
        cursor: "pointer",
        width: 56,
        height: 28,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: "text.primary", 
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: !isDark ? "primary.main" : "transparent",
          color: !isDark ? "background.paper" : "text.secondary",
          transition: "all 0.2s ease",
        }}
      >
        <Typography
          sx={{ fontWeight: 900, fontSize: "0.75rem", fontFamily: "inherit" }}
        >
          L
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: isDark ? "primary.main" : "transparent",
          color: isDark ? "background.paper" : "text.secondary",
          transition: "all 0.2s ease",
        }}
      >
        <Typography
          sx={{ fontWeight: 900, fontSize: "0.75rem", fontFamily: "inherit" }}
        >
          D
        </Typography>
      </Box>
    </Box>
  );
};
