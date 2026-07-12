
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { PaginationControls } from "../../components/product/PaginationControls";
import { FilterSidebar } from "../../components/product/FilterSidebar";
import { ProductCard } from "../../components/product/ProductCard";
import type { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=6`;

        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (sort) url += `&sort=${sort}`;
        if (gender) url += `&gender=${gender}`;
        if (color) url += `&color=${color}`;
        if (size) url += `&size=${size}`;

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [page, search, sort, gender, color, size]); 

  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    setter(value);
    setPage(1);
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          mb: 4,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
        }}
      >
        Find Your Style
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "260px" }, flexShrink: 0 }}>
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

        <Box sx={{ flexGrow: 1 }}>
          {products.length === 0 ? (
            <Typography sx={{ mt: 4, textAlign: "center", fontWeight: "bold" }}>
              NO PRODUCTS FOUND.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          {totalPages > 0 && (
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