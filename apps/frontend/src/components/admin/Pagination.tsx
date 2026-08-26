"use client";

import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  entityName?: string;
  from: number;
  to: number;
  total: number;
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  entityName = "items",
  from,
  to,
  total,
  totalPages,
  page,
  onPageChange,
}: PaginationProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 3,
        py: 2,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
        Showing {from}-{to} of {total} {entityName} · Page {page} of
        {totalPages}
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          size="small"
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 0,
            width: 32,
            height: 32,
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <IconButton
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(page + 1)}
          size="small"
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 0,
            width: 32,
            height: 32,
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
