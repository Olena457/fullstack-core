
"use client";

import { use } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import Link from "next/link";
import { ProductImage } from "../../../components/product/ProductImage";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { useProductDetail } from "../../../hooks/useProductDetail";
import { FavoriteIcon } from "../../../components/ui/FavoriteIcon";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);

  const {
    product,
    selectedSize,
    selectedColor,
    isLoading,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    isReadyToCart,
    isFav,
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
    handleCloseSnackbar,
    handleClearSelection,
    handleToggleFavorite, 
  } = useProductDetail(id);

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10, color: "text.primary" }}>
        LOADING PRODUCT DETAILS...
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 3, textAlign: "center", mt: 10, color: "text.primary" }}>
        PRODUCT NOT FOUND.
      </Box>
    );
  }

  return (
    <Box
      sx={{ p: 2, maxWidth: "1200px", margin: "0 auto", color: "text.primary" }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              display: "inline-block",
              color: "text.primary",
              "&:hover": { color: "text.secondary" },
            }}
          >
            ← Back to Catalog
          </Typography>
        </Link>

        <IconButton
          onClick={handleToggleFavorite} // <- Тепер викликаємо оновлену функцію з перевіркою
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 0,
            opacity: isFav ? 1 : 0.4,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              opacity: 1,
              borderColor: "text.primary",
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          gap: 8,
        }}
      >
        <ProductImage
          imageUrl={product.imageUrl}
          title={product.title}
          gender={product.gender}
        />

        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          isReadyToCart={isReadyToCart}
          snackbarOpen={snackbarOpen}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
          onSizeChange={setSelectedSize}
          onColorChange={setSelectedColor}
          onAddToCart={handleAddToCart}
          onCloseSnackbar={handleCloseSnackbar}
          onClearSelection={handleClearSelection}
        />
      </Box>
    </Box>
  );
}