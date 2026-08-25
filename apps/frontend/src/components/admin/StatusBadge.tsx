"use client";

import { Box, Typography } from "@mui/material";
import type { OrderStatus } from "../../types/admin";

export function StatusBadge({ status }: { status: OrderStatus }) {
  const getStyles = () => {
    switch (status) {
      case "PENDING":
        return { bg: "secondary.main", color: "#fff" };
      case "PAID":
        return { bg: "success.main", color: "#fff" };
      case "SHIPPED": 
        return { bg: "primary.main", color: "background.default" };
      case "CANCELLED":
        return { bg: "error.main", color: "#fff" };
      default: 
        return { bg: "divider", color: "text.primary" };
    }
  };

  const styles = getStyles();

  return (
    <Box
      sx={{
        bgcolor: styles.bg,
        px: 1.5,
        py: 0.5,
        display: "inline-flex",
      }}
    >
      <Typography
        sx={{
          color: styles.color,
          fontSize: "0.75rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {status}
      </Typography>
    </Box>
  );
}
