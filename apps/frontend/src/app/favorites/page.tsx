"use client";

import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { FavoriteIcon } from "@/components/ui/FavoriteIcon";
import { useFavoritesPage } from "@/hooks/useFavoritesPage";

export default function FavoritesPage() {
  const { mounted, favorites, handleRemoveFavorite } = useFavoritesPage();

  if (!mounted) {
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
        maxWidth: "1200px",
        margin: "0 auto",
        color: "text.primary",
        bgcolor: "background.default",
        minHeight: "100vh",
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
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            You haven &#39; t saved any items yet.
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
        <Grid container spacing={3}>
          {favorites.map((id) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={id}>
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <IconButton
                  onClick={() => handleRemoveFavorite(id)}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "background.default",
                    color: "secondary.main",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 0,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.hover",
                      borderColor: "text.primary",
                    },
                  }}
                >
                  <FavoriteIcon />
                </IconButton>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    mt: 5,
                    color: "text.primary",
                  }}
                >
                  Product ID: {id}
                </Typography>

                <Link
                  href={`/products/${id}`}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: 0,
                      borderColor: "divider",
                      color: "text.primary",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      "&:hover": {
                        borderColor: "primary.main",
                        bgcolor: "primary.main",
                        color: "background.paper",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
