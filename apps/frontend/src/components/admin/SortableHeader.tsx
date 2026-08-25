"use client";

import { TableSortLabel } from "@mui/material";

interface SortableHeaderProps {
  columnKey: string;
  label: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (key: string) => void;
}

export const SortableHeader = ({
  columnKey,
  label,
  sortBy,
  sortOrder,
  onSort,
}: SortableHeaderProps) => (
  <TableSortLabel
    active={sortBy === columnKey}
    direction={sortBy === columnKey ? sortOrder : "asc"}
    onClick={() => onSort(columnKey)}
    sx={{ fontWeight: 800, fontSize: "0.75rem" }}
  >
    {label}
  </TableSortLabel>
);
