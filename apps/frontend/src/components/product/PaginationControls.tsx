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
            border: "1px solid black",
            borderRadius: 0, 
            color: "black",
            fontWeight: "bold",
            fontFamily: "inherit",
            "&:hover": {
              backgroundColor: "#bdbdbd",
              color: "white",
            },
            "&.Mui-selected": {
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#bdbdbd",
              },
            },
          },
        }}
      />
    </Box>
  );
};
