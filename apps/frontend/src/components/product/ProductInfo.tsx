
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { ProductOptions } from "./ProductOptions";
import type { Product } from "../../types/product";
import { ContactWidget } from "../../components/ui/ContactWidget";
import { FavoriteIcon } from "../ui/FavoriteIcon"; 

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  isReadyToCart: boolean;
  isFav: boolean; 
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onAddToCart: () => void;
  onClearSelection: () => void;
  onToggleFavorite: () => void; 
}

export const ProductInfo = ({
  product,
  selectedSize,
  selectedColor,
  isReadyToCart,
  isFav,
  onSizeChange,
  onColorChange,
  onAddToCart,
  onClearSelection,
  onToggleFavorite,
}: ProductInfoProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: { xs: 2, md: 3 },
      width: "100%",
      minWidth: 0,
    }}
  >
    <Box sx={{ minWidth: 0, width: "100%" }}>
      <Tooltip title={product.title} placement="bottom-start" arrow>
        <Typography
          variant="h1"
          noWrap
          sx={{
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            mb: 1,
            mt: { xs: 2, md: 0 },
            color: "text.primary",
            fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.6rem" },
            lineHeight: 1.2,
            width: "100%",
            cursor: "default",
            
          }}
        >
          {product.title}
        </Typography>
      </Tooltip>

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          mb: 2,
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
        }}
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

    <Box
      sx={{
        mt: 1,
        display: "flex",
        gap: { xs: 1, sm: 2 },
        alignItems: "center",
        width: "100%",
        pb: 2,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      <Button
        variant="contained"
        onClick={onAddToCart}
        sx={{
          height: { xs: "46px", sm: "52px" },
          borderRadius: 0,
          bgcolor: isReadyToCart ? "primary.main" : "action.disabledBackground",
          color: isReadyToCart ? "background.paper" : "text.secondary",
          fontWeight: "bold",
          fontSize: { xs: "0.7rem", sm: "1rem" },
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          minWidth: 0,
          "&:hover": {
            bgcolor: isReadyToCart
              ? "action.hover"
              : "action.disabledBackground",
          },
        }}
      >
        {isReadyToCart ? "Add to Cart" : "Select Options"}
      </Button>

      {(selectedSize || selectedColor) && (
        <Button
          variant="outlined"
          onClick={onClearSelection}
          sx={{
            height: { xs: "46px", sm: "52px" },
            borderRadius: 0,
            border: 1,
            borderColor: "divider",
            color: "text.primary",
            px: { xs: 1, sm: 2 },
            fontWeight: "bold",
            fontSize: { xs: "0.7rem", sm: "1rem" },
            whiteSpace: "nowrap",
            minWidth: { xs: "auto", sm: "100px" },
            "&:hover": { borderColor: "text.primary", bgcolor: "action.hover" },
          }}
        >
          CANCEL
        </Button>
      )}

      {/* НОВА КНОПКА ФАВОРИТІВ */}
      <IconButton
        onClick={onToggleFavorite}
        sx={(theme) => ({
          height: { xs: "46px", sm: "52px" },
          width: { xs: "46px", sm: "52px" },
          borderRadius: 0,
          border: 1,
          borderColor: "divider",
          color: isFav ? "secondary.main" : "text.secondary",
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor:
              theme.palette.mode === "light" ? "action.hover" : "primary.main",
            borderColor: "text.primary",
            color: "secondary.main",
          },
        })}
      >
        <FavoriteIcon />
      </IconButton>

      <ContactWidget />
    </Box>
  </Box>
);