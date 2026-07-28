import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T[];
}

interface SearchSettlementsData {
  Addresses?: Record<string, unknown>[];
}

@Injectable()
export class DeliveryService {
  private readonly apiUrl = 'https://api.novaposhta.ua/v2.0/json/';
  private readonly apiKey = process.env.NOVAPOSHTA_API_KEY;

  async searchCities(cityName: string): Promise<Record<string, unknown>[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: this.apiKey,
          modelName: 'Address',
          calledMethod: 'searchSettlements',
          methodProperties: {
            CityName: cityName,
            Limit: '15',
            Page: '1',
          },
        }),
      });

      const data = (await response.json()) as NovaPoshtaResponse<SearchSettlementsData>;

      if (data.success && data.data.length > 0 && data.data[0]?.Addresses) {
        return data.data[0].Addresses;
      }

      return [];
    } catch (error: unknown) {
      console.error('Nova Poshta API Error (Cities):', error);
      throw new HttpException(
        'Error fetching cities from Nova Poshta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getWarehouses(cityRef: string): Promise<Record<string, unknown>[]> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: this.apiKey,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: {
            SettlementRef: cityRef,
            Limit: '15',
            Page: '1',
          },
        }),
      });

      const data = (await response.json()) as NovaPoshtaResponse<Record<string, unknown>>;

      if (data.success && data.data) {
        return data.data;
      }

      return [];
    } catch (error: unknown) {
      console.error('Nova Poshta API Error (Warehouses):', error);
      throw new HttpException(
        'Error fetching warehouses from Nova Poshta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
