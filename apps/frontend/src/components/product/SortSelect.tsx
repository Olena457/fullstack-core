import { Box, MenuItem, Select, Typography } from "@mui/material";

export const SortSelect = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
      <Typography sx={{ fontWeight: "bold", color: "text.primary" }}>
        Sort:
      </Typography>
      <Select
        defaultValue="name_asc"
        size="small"
        sx={{
          borderRadius: 0,
          border: 1,
          borderColor: "divider",
          minWidth: 200,
          color: "text.primary",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover": { borderColor: "text.primary" },
          "&.Mui-focused": { borderColor: "primary.main" },
          "& .MuiSvgIcon-root": { color: "text.primary" }, 
        }}
      >
        <MenuItem value="name_asc">Name: A → Z</MenuItem>
        <MenuItem value="name_desc">Name: Z → A</MenuItem>
        <MenuItem value="price_asc">Price: low to high</MenuItem>
        <MenuItem value="price_desc">Price: high to low</MenuItem>
      </Select>
    </Box>
  );
};
