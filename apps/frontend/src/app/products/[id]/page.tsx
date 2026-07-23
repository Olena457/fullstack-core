
"use client";

import { use } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ProductImage } from "../../../components/product/ProductImage";
import { ProductInfo } from "../../../components/product/ProductInfo";
import { useProductDetail } from "../../../hooks/useProductDetail";

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
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
    handleCloseSnackbar,
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
      <Box sx={{ mb: 1 }}>
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
        />
      </Box>
    </Box>
  );
}