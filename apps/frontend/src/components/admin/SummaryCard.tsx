
"use client";

import { useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import type { AdminOrder } from "../../types/admin";

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
        px: 3,
        py: 4,
        flex: 1,
        minWidth: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        gap: 1,
        height: "100%", 
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.9rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: valueColor,
          fontSize: "1.8rem", 
          fontWeight: 800,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

interface AdminSummaryProps {
  orders: AdminOrder[];
}

export function AdminSummary({ orders }: AdminSummaryProps) {
  const { totalRevenue, pendingCount } = useMemo(() => {
    let revenue = 0;
    let pending = 0;

    orders.forEach((order) => {
      if (
        order.status?.toLowerCase() !== "cancelled" &&
        order.status?.toLowerCase() !== "canceled"
      ) {
        revenue += Number(order.totalPrice || 0);
      }

      if (order.status?.toLowerCase() === "pending") {
        pending++;
      }
    });

    return {
      totalRevenue: revenue.toFixed(2) + " USD",
      pendingCount: pending,
    };
  }, [orders]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 3, 
        alignItems: "stretch",
      }}
    >
      <Box sx={{ flex: 1, display: "flex" }}>
        <SummaryCard
          title="TOTAL REVENUE"
          value={totalRevenue}
          valueColor="#2E7D32"
        />
      </Box>

      <Box sx={{ flex: 1, display: "flex" }}>
        <SummaryCard title="TOTAL ORDERS" value={orders.length} />
      </Box>

      <Box sx={{ flex: 1, display: "flex" }}>
        <SummaryCard
          title="PENDING ORDERS"
          value={pendingCount}
          valueColor="#FF4500"
        />
      </Box>
    </Box>
  );
}