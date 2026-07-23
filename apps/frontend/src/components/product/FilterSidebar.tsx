import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SearchInput } from "./SearchInput";
import type { FilterSidebarProps } from "../../types/filters";

const filters = {
  sort: [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "name_asc", label: "Name: A → Z" },
  ],
  gender: ["Men's", "Women's", "Unisex"],
  color: ["White", "Black", "Blue", "Green", "Grey", "Red", "Navy"],
  size: ["XXS", "XS", "S", "M", "L", "XL", "XXL"],
};

export const FilterSidebar = ({
  search,
  onSearchChange,
  selectedSort,
  selectedGender,
  selectedColor,
  selectedSize,
  onSortChange,
  onGenderChange,
  onColorChange,
  onSizeChange,
}: FilterSidebarProps) => {
  const selectStyles = {
    borderRadius: 0,
    color: "text.primary",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "divider",
      borderWidth: "1px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "text.primary",
      borderWidth: "2px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "primary.main",
      borderWidth: "2px",
    },
    "& .MuiSvgIcon-root": {
      color: "text.primary",
    },
  };

  const labelStyles = {
    color: "text.primary",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "secondary.main",
    },
  };

  return (
    <Box sx={{ pr: { md: 4 } }}>
      <SearchInput value={search} onChange={onSearchChange} />

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="sort-select-label" sx={labelStyles}>
          Sort By
        </InputLabel>
        <Select
          labelId="sort-select-label"
          value={selectedSort}
          label="Sort By"
          onChange={(e) => onSortChange(e.target.value)}
          sx={selectStyles}
          MenuProps={{ disableScrollLock: true }}
        >
          {filters.sort.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="gender-select-label" sx={labelStyles}>
          Gender
        </InputLabel>
        <Select
          labelId="gender-select-label"
          value={selectedGender}
          label="Gender"
          onChange={(e) => onGenderChange(e.target.value)}
          sx={selectStyles}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">
            <em>All Genders</em>
          </MenuItem>
          {filters.gender.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="color-select-label" sx={labelStyles}>
          Color
        </InputLabel>
        <Select
          labelId="color-select-label"
          value={selectedColor}
          label="Color"
          onChange={(e) => onColorChange(e.target.value)}
          sx={selectStyles}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">
            <em>All Colors</em>
          </MenuItem>
          {filters.color.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="size-select-label" sx={labelStyles}>
          Size
        </InputLabel>
        <Select
          labelId="size-select-label"
          value={selectedSize}
          label="Size"
          onChange={(e) => onSizeChange(e.target.value)}
          sx={selectStyles}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value="">
            <em>All Sizes</em>
          </MenuItem>
          {filters.size.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
