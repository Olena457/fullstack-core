const API_KEY = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_KEY || "";
const API_URL = "https://api.novaposhta.ua/v2.0/json/";

export const searchCities = async (cityName: string) => {
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
    return data.success ? data.data[0].Addresses : [];
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

export const getWarehouses = async (cityRef: string) => {
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
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return [];
  }
};
