import { Pagination, Box } from "@mui/material";

interface Props {
  page: number;
  count: number;
  onChange: (page: number) => void;
}

export const PaginationControls = ({ page, count, onChange }: Props) => {
  if (count <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        shape="rounded"
        variant="outlined"
        sx={{
          "& .MuiPaginationItem-root": {
            border: 1,
            borderColor: "divider",
            borderRadius: 0,
            color: "text.primary",
            fontWeight: "bold",
            fontFamily: "inherit",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "background.paper", 
              "&:hover": {
                backgroundColor: "action.hover",
                color: "text.primary",
              },
            },
          },
        }}
      />
    </Box>
  );
};
