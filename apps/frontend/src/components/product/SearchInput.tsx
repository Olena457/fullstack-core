import { TextField, InputAdornment, IconButton, useTheme } from "@mui/material";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const theme = useTheme();

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,

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
              <Search size={18} color={theme.palette.text.primary} />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton onClick={() => onChange("")} edge="end" size="small">
                <X size={16} color={theme.palette.text.primary} />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
