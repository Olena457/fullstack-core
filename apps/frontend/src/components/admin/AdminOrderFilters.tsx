"use client";

import { Box, TextField, Button, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface AdminOrderFiltersProps {
  activeFilter: string;
  onFilterChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Paid", value: "PAID" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export function AdminOrderFilters({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
}: AdminOrderFiltersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 2,
        mb: 3,
        alignItems: "center",
      }}
    >
      <TextField
        placeholder="Search orders..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{
          flexGrow: 1,
          maxWidth: 200,
          "& .MuiOutlinedInput-root": { borderRadius: 0 },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 0.5 }}>
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <Button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              variant={isActive ? "contained" : "outlined"}
              sx={{
                borderRadius: 0,
                boxShadow: "none",
                fontSize: "0.7rem",
                px: 1.2,
                fontWeight: 600,
                color: isActive ? "background.paper" : "text.secondary",
                borderColor: isActive ? "transparent" : "divider",
              }}
            >
              {f.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
