

"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; 
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useFavoritesStore } from "../store/favoritesStore"; 
import type { Product } from "../types/product";

export const useProductDetail = (id: string) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const token = useAuthStore((state) => state.token); 
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFav = useFavoritesStore((state) => state.isFavorite(id));

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
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
      toast.warning("Please log in or register to make a purchase.");
      return;
    }
    if (!selectedSize || !selectedColor) {
      toast.error("Please select both size and color before adding to cart.");
      return;
    }
    if (product) {
      addToCart(product, selectedSize, selectedColor);
      toast.success("Product added to cart!");
    }
  };

  const handleToggleFavorite = () => {
    if (!token) {
      toast.warning("Please log in to add items to favorites.");
      return;
    }
    toggleFavorite(id);
    if (!isFav) {
      toast.success("Added to favorites!");
    } else {
      toast.info("Removed from favorites.");
    }
  };

  const handleClearSelection = () => {
    setSelectedSize("");
    setSelectedColor("");
  };

  const isReadyToCart = selectedSize !== "" && selectedColor !== "";

  return {
    product,
    selectedSize,
    selectedColor,
    isLoading,
    isReadyToCart,
    isFav, 
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
    handleClearSelection,
    handleToggleFavorite, 
  };
};