
"use client";

import { useEffect, useState, use } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCartStore } from "../../../store/cartStore";
import { ProductOptions } from "../../../components/product/ProductOptions";
import type { Product } from "../../../types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        );
        if (res.ok) {
          const productData = await res.json();
          setProduct(productData);
        }
      } catch (error) {
        console.error("Failed to fetch product data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setErrorMsg("Please select both size and color before adding to cart.");
      return;
    }

    setErrorMsg("");
    if (product) {
      addToCart(product, selectedSize, selectedColor);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
        LOADING PRODUCT DETAILS...
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 3, textAlign: "center", mt: 10 }}>PRODUCT NOT FOUND.</Box>
    );
  }

  const isReadyToCart = selectedSize !== "" && selectedColor !== "";

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", margin: "0 auto" }}>
      <Box sx={{ mb: 1 }}>
        <Link
          href="/products"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              display: "inline-block",
              "&:hover": { color: "#bdbdbd" },
            }}
          >
            ← Back to Catalog
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
          gap: 8,
        }}
      >
        <Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "650px",
              aspectRatio: "1/1",
              border: "1px solid black",
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 650px"
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </Box>
          {product.gender && (
            <Typography
              variant="overline"
              sx={{
                fontWeight: 900,
                color: "#FF4500",
                letterSpacing: "0.1em",
                display: "block",
                lineHeight: 1,
                mt: 1.5,
              }}
            >
              {product.gender}
            </Typography>
          )}
        </Box>

        {/* details */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                mb: 1,
                mt: { xs: 2, md: 0 },
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "black", mb: 2 }}
            >
              ${product.price.toFixed(2)}
            </Typography>
          </Box>

          {/* accordion*/}
          <Box sx={{ mt: -1, mb: 1 }}>
            <Accordion
              disableGutters
              elevation={0}
              square
              sx={{
                borderTop: "1px solid gray",
                borderBottom: "1px solid gray",
                "&:before": { display: "none" },
                bgcolor: "transparent",
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown size={20} color="gray" />}
                sx={{
                  px: 0,
                  minHeight: "48px",
                  "&.Mui-expanded": { minHeight: "48px" },
                  "& .MuiAccordionSummary-content": { my: 1 },
                  "& .MuiAccordionSummary-content.Mui-expanded": { my: 1 },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.9rem",
                  }}
                >
                  Description
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.6, color: "text.secondary" }}
                >
                  {product.description ||
                    "No description provided for this exclusive piece."}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* options */}
          <ProductOptions
            sizes={product.sizes}
            colors={product.colors}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 1, borderRadius: 0 }}>
              {errorMsg}
            </Alert>
          )}

          {/* button add */}
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                borderRadius: 0,
                bgcolor: isReadyToCart ? "black" : "grey.400",
                color: "white",
                py: 2,
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "uppercase",
                "&:hover": {
                  bgcolor: isReadyToCart ? "rgba(0,0,0,0.8)" : "grey.400",
                },
              }}
            >
              {isReadyToCart ? "Add to Cart" : "Select Options"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}