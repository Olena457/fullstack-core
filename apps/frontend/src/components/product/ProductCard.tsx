
"use client";

import { memo } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import type { Product } from "../../types/product";

type Props = {
  product: Product;
};


export const ProductCard = memo(function ProductCard({ product }: Props) {
  return (
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
            borderBottom: "1px solid black",
            transition: "transform 0.4s ease-out, filter 0.4s ease-out",
            "&:hover": {
              transform: "scale(1.05)",
              filter: "grayscale(100%) brightness(115%) contrast(105%)",
            },
          }}
        />
      </Link>

      <CardContent
        sx={{
          p: 2,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          bgcolor: "white",
        }}
      >
        <Box>
          <Link
            href={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                mb: 0.5,
                lineHeight: 1.2,
                cursor: "pointer",
                "&:hover": {
                  color: "#FF4500",
                },
              }}
            >
              {product.title}
            </Typography>
          </Link>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
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
            sx={{
              borderRadius: 0,
              border: "1px solid black",
              color: "black",
              fontWeight: "bold",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#bdbdbd",
                borderColor: "black",
                color: "#ffffff",
              },
            }}
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
});