
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
    isReadyToCart,
    isFav,
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
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
      <Box sx={{ mb: 2 }}>
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
          gap: { xs: 3, md: 8 },
        }}
      >
  {/* photo */}
        <Box sx={{ position: "relative", width: "100%", display: "block" }}>
          <ProductImage
            imageUrl={product.imageUrl}
            title={product.title}
            gender={product.gender}
          />
        </Box> 
      
        {/*information*/}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            isReadyToCart={isReadyToCart}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
            onAddToCart={handleAddToCart}
            onClearSelection={handleClearSelection}
            isFav={isFav}
            onToggleFavorite={handleToggleFavorite}
          />
        </Box>
      </Box>
    </Box>
  );
}