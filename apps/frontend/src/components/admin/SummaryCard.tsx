"use client";

import { Paper, Typography } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
}

export function SummaryCard({
  title,
  value,
  valueColor = "text.primary",
}: SummaryCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 0, 
        borderColor: "divider",
        p: 3,
        flex: 1,
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: valueColor,
          fontSize: "2rem",
          fontWeight: 900,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}
