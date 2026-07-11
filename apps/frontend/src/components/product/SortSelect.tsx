import { Box, MenuItem, Select, Typography } from "@mui/material";

export const SortSelect = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
      <Typography sx={{ fontWeight: "bold" }}>Sort:</Typography>
      <Select
        defaultValue="name_asc"
        size="small"
        sx={{
          borderRadius: 0,
          border: "1px solid black",
          minWidth: 200,
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover": { borderColor: "black" },
          "&.Mui-focused": { borderColor: "black" },
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
