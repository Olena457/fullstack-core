"use client";

import { Box, Typography, CircularProgress, Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "../../components/product/ProductCard";
import { useFavoritesStore } from "../../store/favoritesStore";
import { useAuthStore } from "../../store/authStore";
import { useStore } from "../../hooks/useStore";
import type { Product } from "../../types/product";

export default function FavoritesPage() {
  const router = useRouter();
  const favorites = useStore(useFavoritesStore, (state) => state.favorites);
  const isAuthenticated = useStore(useAuthStore, (state) =>
    state.isAuthenticated(),
  );

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (favorites === undefined) return;

    const fetchFavoriteProducts = async () => {
      if (!favorites.length) {
        setFavoriteProducts([]);
        return;
      }

      setIsLoading(true);
      try {
        const promises = favorites.map(async (id) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
            );

            if (!res.ok) {
              console.warn(
                `Product not found with ID: ${id}. Status: ${res.status}`,
              );
              return null;
            }

            const text = await res.text();

            if (!text) {
              console.warn(`Empty response for product ID: ${id}`);
              return null;
            }

            return JSON.parse(text);
          } catch (err) {
            console.error(`Error fetching product ${id}:`, err);
            return null;
          }
        });

        const productsData = await Promise.all(promises);

        setFavoriteProducts(productsData.filter(Boolean));
      } catch (error) {
        console.error("Failed to process favorites", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  if (
    favorites === undefined ||
    isLoading ||
    isAuthenticated === undefined ||
    isAuthenticated === false
  ) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: "1400px",
        margin: "0 auto",
        color: "text.primary",
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          mb: 3,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
        }}
      >
        Favorites {favoriteProducts.length}
      </Typography>

      {favoriteProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You haven&#39;t saved any items yet.
          </Typography>

          <Link href="/products" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "background.paper",
                borderRadius: 0,
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                "&:hover": { bgcolor: "action.hover", color: "text.primary" },
              }}
            >
              Return to Catalog
            </Button>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              lg: "repeat(4, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {favoriteProducts.map((product) => (
            <Box key={product.id} sx={{ minWidth: 0 }}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
