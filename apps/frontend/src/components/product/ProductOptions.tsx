import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";

interface ProductOptionsProps {
  sizes?: string[];
  colors?: string[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
}

const colorMap: Record<string, { bg: string; text: string }> = {
  white: { bg: "#FFFFFF", text: "#000000" },
  black: { bg: "#000000", text: "#FFFFFF" },
  blue: { bg: "#1976D2", text: "#FFFFFF" },
  green: { bg: "#2E7D32", text: "#FFFFFF" },
  grey: { bg: "#9E9E9E", text: "#000000" },
  red: { bg: "#D32F2F", text: "#FFFFFF" },
  navy: { bg: "#000080", text: "#FFFFFF" },
};

export const ProductOptions = ({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
}: ProductOptionsProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {sizes && sizes.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
              textTransform: "uppercase",
              color: "text.primary",
            }}
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
                  border: "1px solid",
                  borderColor: "divider !important",
                  color: "text.primary",
                  fontWeight: "bold",
                  px: 3,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "background.paper",
                    "&:hover": { bgcolor: "primary.main" },
                  },
                }}
              >
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      )}

      {colors && colors.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
              textTransform: "uppercase",
              color: "text.primary",
            }}
          >
            Color:
          </Typography>
          <ToggleButtonGroup
            value={selectedColor}
            exclusive
            onChange={(_, newColor) => newColor && onColorChange(newColor)}
            sx={{ gap: 1.5, flexWrap: "wrap" }}
          >
            {colors.map((color) => {
              const colorInfo = colorMap[color.toLowerCase()] || {
                bg: "#EEEEEE",
                text: "#000",
              };
              const isSelected = selectedColor === color;

              return (
                <ToggleButton
                  key={color}
                  value={color}
                  sx={{
                    borderRadius: 0,
                    border: "1px solid",
                    borderColor: "divider !important",
                    bgcolor: colorInfo.bg,
                    color: colorInfo.text,
                    textTransform: "none",
                    fontWeight: isSelected ? "bold" : "normal",
                    px: 3,
                    py: 1,
                    boxShadow: isSelected
                      ? `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.secondary.main}`
                      : "none",
                    "&:hover": {
                      bgcolor: colorInfo.bg,
                      opacity: 0.8,
                    },
                    "&.Mui-selected": {
                      bgcolor: colorInfo.bg,
                      color: colorInfo.text,
                      "&:hover": { bgcolor: colorInfo.bg },
                    },
                  }}
                >
                  {color}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>
      )}
    </Box>
  );
};
