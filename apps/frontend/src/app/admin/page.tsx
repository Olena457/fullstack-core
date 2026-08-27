
"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useState, useRef, useMemo } from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import { SummaryCard } from "../../components/admin/SummaryCard";
import { AdminOrdersTable } from "../../components/admin/AdminOrdersTable";
import { Pagination } from "../../components/admin/Pagination";
import { SearchInput } from "../../components/product/SearchInput";
import type { AuthState, AdminOrder } from "../../types/admin";

export default function AdminPage() {
  const router = useRouter();
  const user = useAuthStore((state: AuthState) => state.user);
  const token = useAuthStore((state: AuthState) => state.token);

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const hasFetched = useRef(false);

  // Стан для пошуку
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted || hasFetched.current) return;
    if (!user || user.role !== "ADMIN") {
      router.push("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    hasFetched.current = true;
  }, [user, token, isMounted, router]);

  // НОВА ФУНКЦІЯ: Одночасно оновлює пошук і скидає сторінку на 1
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
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

  // Фільтрація та сортування об'єднані
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    // 1. Спочатку фільтруємо замовлення, якщо є пошуковий запит
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

    // 2. Потім сортуємо відфільтровані результати
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
  }, [orders, sortBy, sortOrder, searchQuery]);

  const totalRevenue = orders
    .filter((o) => o.status === "PAID" || o.status === "SHIPPED")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  // Використовуємо відфільтровані дані для пагінації
  const total = filteredAndSortedOrders.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const paginatedOrders = filteredAndSortedOrders.slice(
    (page - 1) * limit,
    page * limit,
  );

  if (!isMounted) return null;
  if (loading)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading data...</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textTransform: "uppercase" }}
      >
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 5 }}>
        <SummaryCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
        />
        <SummaryCard
          title="Pending Orders"
          value={pendingOrders}
          valueColor="secondary.main"
        />
        <SummaryCard title="Total Orders" value={orders.length} />
      </Box>

      {/* Компонент пошуку обгорнуто в Box для обмеження ширини */}
      <Box sx={{ maxWidth: { xs: "100%", md: 500 } }}>
        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange} // Використовуємо нову функцію
          placeholder="SEARCH ORDERS BY ID, NAME OR EMAIL..."
        />
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