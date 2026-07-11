"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { PaginationControls } from "../../components/PaginationControls";
import { FilterSidebar } from "../../components/FilterSidebar"; 
import { SortSelect } from "../../components/SortSelect";
import type { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/products?page=${page}&limit=8`,
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

      {/* Головний контейнер з боковою панеллю та товарами */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Ліва колонка: Фільтри */}
        <FilterSidebar />

        {/* Права колонка: Сортування + Сітка + Пагінація */}
        <Box sx={{ flexGrow: 1 }}>
          <SortSelect />

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <Card
                  sx={{
                    borderRadius: 0,
                    border: "1px solid black",
                    boxShadow: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="350"
                    image={product.imageUrl}
                    alt={product.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      p: 2,
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 800,
                          textTransform: "uppercase",
                          mb: 0.5,
                          lineHeight: 1.2,
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderRadius: 0,
                        border: "1px solid black",
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "black",
                          color: "white",
                          borderColor: "black",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
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
