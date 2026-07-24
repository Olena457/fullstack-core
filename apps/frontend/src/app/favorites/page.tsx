"use client";

import { Box, Typography, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/favoritesStore";
import Link from "next/link";
import { FavoriteIcon } from "@/components/ui/FavoriteIcon";

export default function FavoritesPage() {
  const [mounted, setMounted] = useState(false);
  const { favorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: "1200px",
        margin: "0 auto",
        color: "text.primary",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 4, textTransform: "uppercase" }}
      >
        Favorites ({favorites.length})
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            You haven &#39;t saved any items yet.
          </Typography>
          <Link
            href="/products"
            style={{
              textDecoration: "underline",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Return to Catalog
          </Link>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((id) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={id}>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={() => toggleFavorite(id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 0,
                    "&:hover": { borderColor: "text.primary" },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>

                <Typography sx={{ fontWeight: "bold", mb: 2, mt: 5 }}>
                  Product ID: {id}
                </Typography>

                <Link
                  href={`/products/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      textDecoration: "underline",
                      color: "text.primary",
                      "&:hover": { color: "text.secondary" },
                    }}
                  >
                    View Details
                  </Typography>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
