
"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import type { Product } from "../types/product";

export const useProductDetail = (id: string) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const token = useAuthStore((state) => state.token);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "warning" | "success"
  >("error");

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
    if (!token) {
      setSnackbarMessage("Please log in or register to make a purchase.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    if (!selectedSize || !selectedColor) {
      setSnackbarMessage(
        "Please select both size and color before adding to cart.",
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (product) {
      addToCart(product, selectedSize, selectedColor);
      setSnackbarMessage("Product added to cart!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const isReadyToCart = selectedSize !== "" && selectedColor !== "";

  return {
    product,
    selectedSize,
    selectedColor,
    isLoading,
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    isReadyToCart,
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
    handleCloseSnackbar,
  };
};
