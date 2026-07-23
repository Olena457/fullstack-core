
"use client";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=6`;

        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (sort) url += `&sort=${sort}`;
        if (gender) url += `&gender=${gender}`;
        if (color) url += `&color=${color}`;
        if (size) url += `&size=${size}`;

        const res = await fetch(url);
        const data = await res.json();

        setProducts(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, search, sort, gender, color, size]);

  const handleFilterChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    setter(value);
    setPage(1);
  };

  return {
    products,
    page,
    totalPages,
    isLoading,
    search,
    sort,
    gender,
    color,
    size,
    setPage,
    setSearch,
    setSort,
    setGender,
    setColor,
    setSize,
    handleFilterChange,
  };
};
