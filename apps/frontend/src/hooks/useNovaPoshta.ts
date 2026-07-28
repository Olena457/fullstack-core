
"use client";

import { useState, useCallback } from "react";
import type { CityOption, BranchOption } from "../types/novaposhta";

const getBackendUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    if (!envUrl.startsWith("http://") && !envUrl.startsWith("https://")) {
      return `http://${envUrl}`;
    }
    return envUrl;
  }
  return "http://localhost:4000";
};

const BACKEND_URL = getBackendUrl();

export const useNovaPoshta = () => {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [warehouses, setWarehouses] = useState<BranchOption[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  const fetchCities = useCallback(async (query: string) => {
    if (!query) return;
    setLoadingCities(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/delivery/cities?query=${encodeURIComponent(query)}`,
      );
      const data = await response.json();

      const citiesArray = Array.isArray(data) ? data : data?.data || [];
      setCities(citiesArray);
    } catch (error) {
      console.error("Error fetching cities from backend:", error);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  }, []);

  const fetchWarehouses = useCallback(async (cityRef: string) => {
    if (!cityRef) return;
    setLoadingWarehouses(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/delivery/warehouses?cityRef=${encodeURIComponent(cityRef)}`,
      );
      const data = await response.json();

      const warehousesArray = Array.isArray(data) ? data : data?.data || [];
      setWarehouses(warehousesArray);
    } catch (error) {
      console.error("Error fetching warehouses from backend:", error);
      setWarehouses([]);
    } finally {
      setLoadingWarehouses(false);
    }
  }, []);

  return {
    cities,
    warehouses,
    loadingCities,
    loadingWarehouses,
    fetchCities,
    fetchWarehouses,
  };
};