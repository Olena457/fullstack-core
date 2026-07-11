
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material"; 
import { PaginationControls } from "../../components/PaginationControls";
import { FilterSidebar } from "../../components/FilterSidebar";
import { SortSelect } from "../../components/SortSelect";
import { ProductCard } from "../../components/ProductCard"; 
import { useCartStore } from "../../store/cartStore"; 
import type { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=8`,
        );
        const data = await res.json();
        setProducts(data.data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, [page]);

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", margin: "0 auto" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}
      >
        ENTROPIC
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <FilterSidebar />

        <Box sx={{ flexGrow: 1 }}>
          <SortSelect />

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                
                <ProductCard product={product} onAdd={addToCart} />
              </Grid>
            ))}
          </Grid>

          <PaginationControls
            page={page}
            count={totalPages}
            onChange={setPage}
          />
        </Box>
      </Box>
    </Box>
  );
}