"use client";

import { TableCell, TableRow, Typography } from "@mui/material";
import { StatusBadge } from "./StatusBadge";
import { OrderRowActions } from "./OrderRowActions";
import type { AdminOrder } from "../../types/admin";

export const AdminOrderRow = ({ order }: { order: AdminOrder }) => {
  const customerName =
    order.user?.name ||
    `${order.firstName || ""} ${order.lastName || ""}`.trim() ||
    "Unknown";
  const customerEmail = order.user?.email || order.email || "No email";

  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: 600 }}>
        #{order.id.slice(0, 8).toUpperCase()}
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {customerName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {customerEmail}
        </Typography>
      </TableCell>

      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>

      <TableCell sx={{ fontWeight: 700 }}>
        ${order.totalPrice.toFixed(2)}
      </TableCell>

      <TableCell>
        <StatusBadge status={order.status} />
      </TableCell>

      <TableCell align="right">
        <OrderRowActions orderId={order.id} />
      </TableCell>
    </TableRow>
  );
};
