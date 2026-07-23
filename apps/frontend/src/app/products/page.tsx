
"use client";

import { Box, Typography } from "@mui/material";
import { PaginationControls } from "../../components/product/PaginationControls";
import { FilterSidebar } from "../../components/product/FilterSidebar";
import { ProductCard } from "../../components/product/ProductCard";
import { ProductSkeletonCard } from "../../components/product/ProductSkeletonCard";
import { useProducts } from "../../hooks/useProducts";

export default function ProductsPage() {
  const {
    products,
    page,
    totalPages,
    isLoading,
    search,
    sort,
    gender,
    color,
    size,
    setPage,
    setSearch,
    setSort,
    setGender,
    setColor,
    setSize,
    handleFilterChange,
  } = useProducts();

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "1400px",
        margin: "0 auto",
        bgcolor: "background.default", 
        color: "text.primary", 
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT filters */}
        <Box sx={{ width: { xs: "100%", md: "260px" }, flexShrink: 0 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              color: "text.primary",
            }}
          >
            Find Your Style
          </Typography>

          <FilterSidebar
            search={search}
            onSearchChange={(val) => handleFilterChange(setSearch, val)}
            selectedSort={sort}
            selectedGender={gender}
            selectedColor={color}
            selectedSize={size}
            onSortChange={(val) => handleFilterChange(setSort, val)}
            onGenderChange={(val) => handleFilterChange(setGender, val)}
            onColorChange={(val) => handleFilterChange(setColor, val)}
            onSizeChange={(val) => handleFilterChange(setSize, val)}
          />
        </Box>

        {/* RIGHT products */}
        <Box sx={{ flexGrow: 1, mt: 1 }}>
          {isLoading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {Array.from(new Array(6)).map((_, index) => (
                <Box key={index}>
                  <ProductSkeletonCard />
                </Box>
              ))}
            </Box>
          ) : products.length === 0 ? (
            <Typography
              sx={{
                mt: 5,
                textAlign: "center",
                fontWeight: "bold",
                color: "text.secondary",
              }}
            >
              NO PRODUCTS FOUND.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {products.map((product) => (
                <Box key={product.id}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Box>
          )}

          {!isLoading && totalPages > 0 && (
            <Box sx={{ mt: 4 }}>
              <PaginationControls
                page={page}
                count={totalPages}
                onChange={setPage}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}