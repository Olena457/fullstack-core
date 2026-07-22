
"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PaginationControls } from "../../components/product/PaginationControls";
import { FilterSidebar } from "../../components/product/FilterSidebar";
import { ProductCard } from "../../components/product/ProductCard";
import { ProductSkeletonCard } from "../../components/product/ProductSkeletonCard"; 
import type { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
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
      } finally {
        setIsLoading(false); 
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
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* LEFT filters*/}
        <Box sx={{ width: { xs: "100%", md: "260px" }, flexShrink: 0 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 4,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
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
            <Typography sx={{ mt: 5, textAlign: "center", fontWeight: "bold" }}>
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