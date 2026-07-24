"use client";

import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/favoritesStore";
import { toast } from "react-toastify";

export const useFavoritesPage = () => {
  const [mounted, setMounted] = useState(false);
  const { favorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFavorite = (id: string) => {
    toggleFavorite(id);
    toast.info("Item removed from favorites.");
  };

  return { mounted, favorites, handleRemoveFavorite };
};
