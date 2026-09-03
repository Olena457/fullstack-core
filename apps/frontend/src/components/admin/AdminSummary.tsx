import { Box } from "@mui/material";
import { SummaryCard } from "./SummaryCard";
import type { AdminOrder } from "../../types/admin";

interface AdminSummaryProps {
  orders: AdminOrder[];
}

export const AdminSummary = ({ orders }: AdminSummaryProps) => {
  const totalRevenue = orders
    .filter((o) => o.status === "PAID" || o.status === "SHIPPED")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 5 }}>
      <SummaryCard
        title="Total Revenue"
        valueColor="#2e7d32"
        value={`${totalRevenue.toFixed(2)}${totalRevenue === 0 ? "" : " USD"}`}
      />
      <SummaryCard title="Total Orders" value={orders.length} />
      <SummaryCard
        title="Pending Orders"
        value={pendingOrders}
        valueColor="#d32f2f"
      />
    </Box>
  );
};
