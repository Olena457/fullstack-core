import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface ProductOptionsProps {
  sizes?: string[];
  colors?: string[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

export const ProductOptions = ({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductOptionsProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Вибір розміру */}
      {sizes && sizes.length > 0 && (
        <Box>
          <Typography
            sx={{ fontWeight: "bold", mb: 1, textTransform: "uppercase" }}
          >
            Size:
          </Typography>
          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={(_, newSize) => newSize && onSizeChange(newSize)}
            sx={{ gap: 1, flexWrap: "wrap" }}
          >
            {sizes.map((size) => (
              <ToggleButton
                key={size}
                value={size}
                sx={{
                  borderRadius: 0,
                  border: "1px solid black !important",
                  color: "black",
                  fontWeight: "bold",
                  px: 3,
                  "&.Mui-selected": {
                    bgcolor: "black",
                    color: "white",
                    "&:hover": { bgcolor: "black" },
                  },
                }}
              >
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      )}

      {/* Вибір кольору */}
      {colors && colors.length > 0 && (
        <Box>
          <Typography
            sx={{ fontWeight: "bold", mb: 1, textTransform: "uppercase" }}
          >
            Color:
          </Typography>
          <ToggleButtonGroup
            value={selectedColor}
            exclusive
            onChange={(_, newColor) => newColor && onColorChange(newColor)}
            sx={{ gap: 1, flexWrap: "wrap" }}
          >
            {colors.map((color) => (
              <ToggleButton
                key={color}
                value={color}
                sx={{
                  borderRadius: 0,
                  border: "1px solid black !important",
                  color: "black",
                  textTransform: "none",
                  px: 2,
                  "&.Mui-selected": {
                    bgcolor: "black",
                    color: "white",
                    "&:hover": { bgcolor: "black" },
                  },
                }}
              >
                {color}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      )}
    </Box>
  );
};
