
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

  // Отримуємо об'єкт user зі стору
  const user = useAuthStore((state) => state.user);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Перевіряємо, чи існує user (чи залогінений він)
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

        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            bgcolor: "rgba(0, 0, 0, 0.15)",
            color: isFav ? "secondary.main" : "#ffffff",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.3)",
              color: "secondary.main",
              transform: "scale(1.1)",
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
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
        <Box sx={{ minWidth: 0 }}>
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
              mb: 2,
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Link
          href={`/products/${product.id}`}
          passHref
          style={{ textDecoration: "none" }}
        >
          <Button
            fullWidth
            variant="outlined"
            sx={(theme) => ({
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
      </CardContent>
    </Card>
  );
});