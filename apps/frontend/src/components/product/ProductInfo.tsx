
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { ProductOptions } from "./ProductOptions";
import type { Product } from "../../types/product";

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  isReadyToCart: boolean;
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: "error" | "warning" | "success" | "info"; // <- "info" додано тут
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onAddToCart: () => void;
  onCloseSnackbar: (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => void;
  onClearSelection: () => void; // <- Додано функцію очищення
}

export const ProductInfo = ({
  product,
  selectedSize,
  selectedColor,
  isReadyToCart,
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  onSizeChange,
  onColorChange,
  onAddToCart,
  onCloseSnackbar,
  onClearSelection, // <- Дістаємо функцію очищення з пропсів
}: ProductInfoProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          mb: 1,
          mt: { xs: 2, md: 0 },
          color: "text.primary",
        }}
      >
        {product.title}
      </Typography>

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "text.primary", mb: 2 }}
      >
        ${product.price.toFixed(2)}
      </Typography>
    </Box>

    <Box sx={{ mt: -1, mb: 1 }}>
      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
          "&:before": { display: "none" },
          bgcolor: "transparent",
        }}
      >
        <AccordionSummary
          expandIcon={<ChevronDown size={20} />}
          sx={{
            px: 0,
            minHeight: "48px",
            "&.Mui-expanded": { minHeight: "48px" },
            "& .MuiAccordionSummary-content": { my: 1, color: "text.primary" },
            "& .MuiAccordionSummary-content.Mui-expanded": { my: 1 },
            "& .MuiSvgIcon-root": { color: "text.primary" },
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontSize: "0.9rem",
            }}
          >
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.6, color: "text.secondary" }}
          >
            {product.description ||
              "No description provided for this exclusive piece."}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>

    <ProductOptions
      sizes={product.sizes}
      colors={product.colors}
      selectedSize={selectedSize}
      selectedColor={selectedColor}
      onSizeChange={onSizeChange}
      onColorChange={onColorChange}
    />

    {/* Оновлений блок кнопок: Flex-контейнер для "Додати" та "Скасувати" */}
    <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        fullWidth
        onClick={onAddToCart}
        sx={{
          flex: 1,
          borderRadius: 0,
          bgcolor: isReadyToCart ? "primary.main" : "action.disabledBackground",
          color: isReadyToCart ? "background.paper" : "text.secondary",
          py: 2,
          fontWeight: "bold",
          fontSize: "1.1rem",
          textTransform: "uppercase",
          "&:hover": {
            bgcolor: isReadyToCart
              ? "action.hover"
              : "action.disabledBackground",
          },
        }}
      >
        {isReadyToCart ? "Add to Cart" : "Select Options"}
      </Button>

      {/* Кнопка скасування з'являється тільки якщо користувач обрав розмір або колір */}
      {(selectedSize || selectedColor) && (
        <Button
          variant="outlined"
          onClick={onClearSelection}
          sx={{
            borderRadius: 0,
            py: 2,
            px: 4,
            fontWeight: "bold",
            borderColor: "divider",
            color: "text.primary",
            "&:hover": { borderColor: "text.primary" },
          }}
        >
          CANCEL
        </Button>
      )}
    </Box>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4000}
      onClose={onCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onCloseSnackbar}
        severity={snackbarSeverity}
        variant="filled"
        sx={{ width: "100%", borderRadius: 0, fontWeight: "bold" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  </Box>
);