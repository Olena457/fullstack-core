
"use client";

import { Box, Typography } from "@mui/material";
import { useState, useMemo } from "react";
import { AdminSummary } from "../../components/admin/AdminSummary";
import { AdminOrdersTable } from "../../components/admin/AdminOrdersTable";
import { Pagination } from "../../components/admin/Pagination";
import { OrderFilters } from "../../components/admin/OrderFilters";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import type { AdminOrder } from "../../types/admin";
import { AdminOrderStatus } from "../../components/admin/AdminOrderStatus";

function useOrderTableLogic(orders: AdminOrder[], limit: number = 8) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnKey);
      setSortOrder("desc");
    }
    setPage(1);
  };

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    if (statusFilter !== "ALL") {
      result = result.filter(
        (order) => order.status?.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((order) => {
        const customerName = (
          order.user?.name ||
          order.firstName ||
          ""
        ).toLowerCase();
        const customerEmail = (
          order.user?.email ||
          order.email ||
          ""
        ).toLowerCase();
        const orderId = order.id.toLowerCase();

        return (
          customerName.includes(query) ||
          customerEmail.includes(query) ||
          orderId.includes(query)
        );
      });
    }

    result.sort((a, b) => {
      let valA: string | number = "";
      let valB: string | number = "";

      if (sortBy === "customer") {
        valA = a.user?.name || a.firstName || "";
        valB = b.user?.name || b.firstName || "";
      } else if (sortBy === "createdAt") {
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
      } else if (sortBy === "totalPrice") {
        valA = Number(a.totalPrice) || 0;
        valB = Number(b.totalPrice) || 0;
      } else {
        valA = String(a[sortBy as keyof AdminOrder] || "");
        valB = String(b[sortBy as keyof AdminOrder] || "");
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [orders, sortBy, sortOrder, searchQuery, statusFilter]);

  const total = filteredAndSortedOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const paginatedOrders = filteredAndSortedOrders.slice(
    (page - 1) * limit,
    page * limit,
  );

  return {
    searchQuery,
    statusFilter,
    sortBy,
    sortOrder,
    page,
    total,
    totalPages,
    from,
    to,
    paginatedOrders,
    handleSearchChange,
    handleStatusChange,
    handleSort,
    setPage,
  };
}

export default function AdminPage() {
  const { orders = [], loading, isMounted } = useAdminOrders();
  const safeOrders = Array.isArray(orders) ? orders : [];

  const {
    searchQuery,
    statusFilter,
    sortBy,
    sortOrder,
    page,
    total,
    totalPages,
    from,
    to,
    paginatedOrders,
    handleSearchChange,
    handleStatusChange,
    handleSort,
    setPage,
  } = useOrderTableLogic(safeOrders);

  if (!isMounted) return null;

  if (loading || !Array.isArray(orders))
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading data...</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: { xs: 1, md: 2 } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          mb: { xs: 2.5, md: 4 },
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          textTransform: "uppercase",
        }}
      >
        Admin Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", xl: "500px 1fr" },
          gap: 3,
          mb: 3,
          alignItems: "stretch",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <AdminOrderStatus orders={safeOrders} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <AdminSummary orders={safeOrders} />

          <Box sx={{ mt: { xs: 3, xl: 0 } }}>
            <OrderFilters
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
            />
          </Box>
        </Box>
      </Box>

      <AdminOrdersTable
        orders={paginatedOrders}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {total > 0 && (
        <Pagination
          entityName="orders"
          from={from}
          to={to}
          total={total}
          totalPages={totalPages}
          page={page}
          onPageChange={setPage}
        />
      )}

      {total === 0 && (
        <Typography
          sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}
        >
          No orders found matching your search.
        </Typography>
      )}
    </Box>
  );
}