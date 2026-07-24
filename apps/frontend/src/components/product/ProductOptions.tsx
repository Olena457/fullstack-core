
import { Box, Typography, Button, useTheme } from "@mui/material";

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
      {/* БЛОК ВИБОРУ РОЗМІРУ */}
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

          {/* Використовуємо звичайний Box + flex + gap замість ToggleButtonGroup */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <Button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  sx={{
                    minWidth: "60px",
                    borderRadius: 0,
                    border: "1px solid", // Повноцінний бордер з усіх сторін
                    borderColor: isSelected ? "secondary.main" : "divider",
                    bgcolor: "transparent",
                    color: isSelected ? "secondary.main" : "text.primary",
                    fontWeight: isSelected ? "bold" : "normal",
                    px: 3,
                    py: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: isSelected
                        ? "secondary.main"
                        : "text.primary",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {size}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}

      {/* БЛОК ВИБОРУ КОЛЬОРУ */}
      {colors && colors.length > 0 && (
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1, // Трохи збільшив відступ для тіней
              textTransform: "uppercase",
              color: "text.primary",
            }}
          >
            Color:
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 0.5 }}>
            {colors.map((color) => {
              const colorInfo = colorMap[color.toLowerCase()] || {
                bg: "#EEEEEE",
                text: "#000",
              };
              const isSelected = selectedColor === color;

              return (
                <Button
                  key={color}
                  onClick={() => onColorChange(color)}
                  sx={{
                    minWidth: "60px",
                    borderRadius: 0,
                    border: "1px solid",
                    borderColor: "divider", // Стандартний бордер для неозначених
                    bgcolor: colorInfo.bg,
                    color: colorInfo.text,
                    textTransform: "none",
                    fontWeight: isSelected ? "bold" : "normal",
                    px: 3,
                    py: 1,
                    // Ваша тінь ідеально підходить для створення рамки навколо кольору!
                    boxShadow: isSelected
                      ? `0 0 0 2px ${theme.palette.background.default}, 0 0 0 4px ${theme.palette.secondary.main}`
                      : "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: colorInfo.bg,
                      opacity: 0.8,
                    },
                  }}
                >
                  {color}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};