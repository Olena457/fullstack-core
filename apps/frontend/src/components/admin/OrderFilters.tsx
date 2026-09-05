"use client";

import { Box, Button } from "@mui/material";
import { SearchInput } from "../product/SearchInput";

const STATUS_FILTER_OPTIONS = [
  { label: "ALL", value: "ALL" },
  { label: "PENDING", value: "pending" },
  { label: "PAID", value: "paid" },
  { label: "CANCELLED", value: "cancelled" },
  { label: "SHIPPED", value: "shipped" },
];

interface OrderFiltersProps {
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
}

export function OrderFilters({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <Box
      sx={{
              display: "flex",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        gap: 2,
        width: "100%",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="SEARCH ORDERS BY ID, NAME OR EMAIL..."
        />
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
        {STATUS_FILTER_OPTIONS.map((option) => {
          const isActive = statusFilter === option.value;
          return (
            <Button
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              variant={isActive ? "contained" : "outlined"}
              sx={{
                borderRadius: 0,
                fontWeight: 700,
                fontSize: "0.75rem",
                px: 1.5, 
                py: 1.1,
                borderColor: "divider",
                backgroundColor: isActive ? "text.primary" : "background.paper",
                color: isActive ? "background.default" : "text.primary",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: isActive ? "text.primary" : "action.hover",
                  borderColor: "divider",
                },
              }}
            >
              {option.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
