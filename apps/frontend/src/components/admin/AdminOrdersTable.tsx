"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { SortableHeader } from "./SortableHeader";
import { AdminOrderRow } from "./AdminOrderRow";
import type { AdminOrder } from "../../types/admin";

interface AdminOrdersTableProps {
  orders: AdminOrder[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (key: string) => void;
}

export function AdminOrdersTable({
  orders,
  sortBy,
  sortOrder,
  onSort,
}: AdminOrdersTableProps) {
  if (orders.length === 0) {
    return (
      <Box
        sx={{
          p: 6,
          textAlign: "center",
          border: 1,
          borderColor: "divider",
          borderStyle: "dashed",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          NO ORDERS FOUND
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ border: 1, borderColor: "divider", borderRadius: 0 }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead sx={{ bgcolor: "action.hover" }}>
          <TableRow>
            <TableCell>
              <SortableHeader
                columnKey="id"
                label="ORDER ID"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell>
              <SortableHeader
                columnKey="customer"
                label="CUSTOMER"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell>
              <SortableHeader
                columnKey="createdAt"
                label="DATE"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell>
              <SortableHeader
                columnKey="totalPrice"
                label="AMOUNT"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell>
              <SortableHeader
                columnKey="status"
                label="STATUS"
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <AdminOrderRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
