
"use client";

import { useState } from "react";
import type { CityOption, BranchOption } from "../types/novaposhta";

const API_KEY = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_KEY || "";
const API_URL = "https://api.novaposhta.ua/v2.0/json/";

const searchCitiesAPI = async (cityName: string): Promise<CityOption[]> => {
  if (!cityName) return [];
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: cityName,
          Limit: "50",
          Page: "1",
        },
      }),
    });
    const data = await response.json();
    return data.success && data.data[0]?.Addresses ? data.data[0].Addresses : [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

const getWarehousesAPI = async (cityRef: string): Promise<BranchOption[]> => {
  if (!cityRef) return [];
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          SettlementRef: cityRef,
        },
      }),
    });
    const data = await response.json();
    return data.success && data.data ? data.data : [];
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return [];
  }
};

export const useNovaPoshta = () => {
  const [cities, setCities] = useState<CityOption[]>([]);
  const [warehouses, setWarehouses] = useState<BranchOption[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  const fetchCities = async (query: string) => {
    setLoadingCities(true);
    const results = await searchCitiesAPI(query);
    setCities(results);
    setLoadingCities(false);
  };

  const fetchWarehouses = async (cityRef: string) => {
    setLoadingWarehouses(true);
    const results = await getWarehousesAPI(cityRef);
    setWarehouses(results);
    setLoadingWarehouses(false);
  };

  return {
    cities,
    warehouses,
    loadingCities,
    loadingWarehouses,
    fetchCities,
    fetchWarehouses,
  };
};