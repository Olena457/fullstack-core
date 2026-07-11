"use client";

import { useEffect, useState, use } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import { useCartStore } from "../../../store/cartStore";
import { useAuthStore } from "../../../store/authStore"; 

import { ReviewSection } from "../../../components/ReviewSection";
import { ReviewForm } from "../../../components/ReviewForm.js"; 
import { ProductOptions } from "../../../components/ProductOptions"; 
import type { Product } from "../../../types/product";
import type { Review } from "../../../types/review";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);

  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const token = useAuthStore((state) => state.token);

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productRes, reviewsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?productId=${id}`),
        ]);

        if (productRes.ok) {
          const productData = await productRes.json();
          setProduct(productData);
          if (productData.sizes?.length) setSelectedSize(productData.sizes[0]);
          if (productData.colors?.length)
            setSelectedColor(productData.colors[0]);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error("Failed to fetch product data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Функція для відправки нового відгуку
  const handleReviewSubmit = async (data: {
    rating: number;
    comment: string;
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Передаємо токен для перевірки на бекенді
      },
      body: JSON.stringify({
        productId: id,
        rating: data.rating,
        comment: data.comment,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to submit review");
    }

    const newReview = await res.json();
    setReviews((prev) => [newReview, ...prev]); // Миттєво додаємо відгук на екран
  };

  if (isLoading)
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
        Loading product details...
      </Box>
    );
  if (!product)
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>Product not found.</Box>
    );

  return (
    <Box sx={{ p: 4, maxWidth: "1200px", margin: "0 auto" }}>
      <Grid container spacing={6}>
        {/* ЛІВА КОЛОНКА: Велике фото */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              border: "1px solid black",
            }}
          />
        </Grid>

        {/* ПРАВА КОЛОНКА: Інформація */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                mb: 1,
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "error.main" }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, color: "text.primary" }}
          >
            {product.description ||
              "No description provided for this exclusive piece."}
          </Typography>

          {/* Використовуємо наш винесений компонент для вибору опцій */}
          <ProductOptions
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              addToCart({
                ...product,
                sizes: [selectedSize],
                colors: [selectedColor],
              })
            }
            sx={{
              borderRadius: 0,
              bgcolor: "black",
              color: "white",
              py: 2,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "uppercase",
              mt: 2,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      {/* БЛОК ВІДГУКІВ */}
      <Box sx={{ mt: 8 }}>
        {isAuthenticated ? (
          <ReviewForm onSubmit={handleReviewSubmit} />
        ) : (
          <Box
            sx={{
              border: "1px solid black",
              p: 4,
              mb: 4,
              textAlign: "center",
              bgcolor: "grey.50",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, textTransform: "uppercase", mb: 1 }}
            >
              Want to share your thoughts?
            </Typography>
            <Typography sx={{ mb: 3 }}>
              You need to be logged in to leave a review.
            </Typography>
            <Link href="/login" passHref>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 0,
                  borderColor: "black",
                  color: "black",
                  fontWeight: "bold",
                  px: 4,
                  "&:hover": { bgcolor: "black", color: "white" },
                }}
              >
                Log In
              </Button>
            </Link>
          </Box>
        )}

        <ReviewSection reviews={reviews} />
      </Box>
    </Box>
  );
}
