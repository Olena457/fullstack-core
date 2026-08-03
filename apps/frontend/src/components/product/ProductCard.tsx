
"use client";

import { memo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import type { Product } from "../../types/product";
import { useFavoritesStore } from "../../store/favoritesStore";
import { useAuthStore } from "../../store/authStore";
import { FavoriteIcon } from "../ui/FavoriteIcon";

type Props = {
  product: Product;
};

export const ProductCard = memo(function ProductCard({ product }: Props) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isFav = isFavorite(product.id);

  const user = useAuthStore((state) => state.user);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.warning("Please log in to add items to favorites.");
      return;
    }

    toggleFavorite(product.id);

    if (!isFav) {
      toast.success("Added to favorites!");
    } else {
      toast.info("Removed from favorites.");
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 0,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Link
          href={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <CardMedia
            component="img"
            height="350"
            image={product.imageUrl}
            alt={product.title}
            sx={{
              objectFit: "cover",
              objectPosition: "50% 20%",
              cursor: "pointer",
              borderBottom: 1,
              borderColor: "divider",
              transition: "transform 0.4s ease-out, filter 0.4s ease-out",
              "&:hover": {
                transform: "scale(1.05)",
                filter: "grayscale(100%) brightness(115%) contrast(105%)",
              },
            }}
          />
        </Link>
      </Box>

      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <Box sx={{ minWidth: 0, mb: 2 }}>
          <Link
            href={`/products/${product.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <Tooltip title={product.title} placement="top" arrow>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{
                  width: "100%",
                  maxWidth: "95%",
                  display: "block",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  mb: 0.5,
                  lineHeight: 1.2,
                  cursor: "pointer",
                  color: "text.primary",
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
              >
                {product.title}
              </Typography>
            </Tooltip>
          </Link>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        {/* button container */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "stretch" }}>
          <Link
            href={`/products/${product.id}`}
            passHref
            style={{ textDecoration: "none", flexGrow: 1 }}
          >
            <Button
              fullWidth
              variant="outlined"
              sx={(theme) => ({
                height: "100%", 
                borderRadius: 0,
                border: 1,
                borderColor: "primary.main",
                color: "primary.main",
                fontWeight: "bold",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
                "&:hover, &:focus": {
                  bgcolor:
                    theme.palette.mode === "light"
                      ? "action.hover"
                      : "primary.main",
                  borderColor: "primary.main",
                  color:
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "background.paper",
                },
              })}
            >
              View Details
            </Button>
          </Link>

          {/* button favorite */}
          <IconButton
            onClick={handleFavoriteClick}
            sx={(theme) => ({
              borderRadius: 0,
              border: 1,
              borderColor: "primary.main",
              color: isFav ? "secondary.main" : "primary.main",
              transition: "all 0.2s ease",
              width: { xs: 40, sm: 48 }, 
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "action.hover"
                    : "primary.main",
                color: "secondary.main",
              },
            })}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
});