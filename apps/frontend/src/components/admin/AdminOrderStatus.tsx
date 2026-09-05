"use client";

import { useMemo } from "react";
import { Box, Paper, LinearProgress } from "@mui/material";
import type { AdminOrder } from "../../types/admin";

interface AdminOrderStatusProps {
  orders: AdminOrder[];
}

export function AdminOrderStatus({ orders }: AdminOrderStatusProps) {
  const stats = useMemo(() => {
    const total = orders.length;
    if (total === 0)
      return {
        pending: 0,
        paid: 0,
        shipped: 0,
        cancelled: 0,
        pendingPercent: 0,
        paidPercent: 0,
        shippedPercent: 0,
        cancelledPercent: 0,
      };

    let pending = 0;
    let paid = 0;
    let shipped = 0;
    let cancelled = 0;

    orders.forEach((order) => {
      const status = order.status?.toLowerCase();

      if (status === "pending") {
        pending++;
      } else if (
        status === "paid" ||
        status === "completed" ||
        status === "delivered"
      ) {
        paid++;
      } else if (status === "shipped") {
        shipped++;
      } else if (status === "cancelled" || status === "canceled") {
        cancelled++;
      }
    });

    return {
      pending,
      paid,
      shipped,
      cancelled,
      pendingPercent: Math.round((pending / total) * 100),
      paidPercent: Math.round((paid / total) * 100),
      shippedPercent: Math.round((shipped / total) * 100),
      cancelledPercent: Math.round((cancelled / total) * 100),
    };
  }, [orders]);

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 0,
        borderColor: "divider",
        p: { xs: 2, lg: 2 },
        height: "88%",
        display: "flex",
        minWidth: 500,
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5, 
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {/* PENDING */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
              fontSize: "0.85rem",
              fontWeight: 800,
            }}
          >
            <span style={{ textTransform: "uppercase" }}>
              Pending ({stats.pending})
            </span>
            <span>{stats.pendingPercent}%</span>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stats.pendingPercent}
            sx={{
              height: 8,
              borderRadius: 0,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": { bgcolor: "#FF4500" },
            }}
          />
        </Box>

        {/* PAID */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
              fontSize: "0.85rem",
              fontWeight: 800,
            }}
          >
            <span style={{ textTransform: "uppercase" }}>
              Paid ({stats.paid})
            </span>
            <span>{stats.paidPercent}%</span>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stats.paidPercent}
            sx={{
              height: 8,
              borderRadius: 0,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": { bgcolor: "#2E7D32" },
            }}
          />
        </Box>

        {/* SHIPPED */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
              fontSize: "0.85rem",
              fontWeight: 800,
            }}
          >
            <span style={{ textTransform: "uppercase" }}>
              Shipped ({stats.shipped})
            </span>
            <span>{stats.shippedPercent}%</span>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stats.shippedPercent}
            sx={{
              height: 8,
              borderRadius: 0,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": { bgcolor: "#0288d1" }, 
            }}
          />
        </Box>

        {/* CANCELLED */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
              fontSize: "0.85rem",
              fontWeight: 800,
            }}
          >
            <span style={{ textTransform: "uppercase" }}>
              Cancelled ({stats.cancelled})
            </span>
            <span>{stats.cancelledPercent}%</span>
          </Box>
          <LinearProgress
            variant="determinate"
            value={stats.cancelledPercent}
            sx={{
              height: 8,
              borderRadius: 0,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": { bgcolor: "#D32F2F" },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
