import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const inputStyles = {
    borderRadius: 0,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "1px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "2px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
      borderWidth: "2px",
    },
  };

  return (
    <TextField
      fullWidth
      size="small"
      placeholder="SEARCH PRODUCT..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
      sx={{ mb: 4, ...inputStyles }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} color="black" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={() => onChange("")} edge="end" size="small">
                <X size={16} color="black" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
