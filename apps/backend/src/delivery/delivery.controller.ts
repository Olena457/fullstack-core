import { Controller, Get, Query } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('cities')
  @ApiOperation({ summary: 'Search Nova Poshta cities' })
  searchCities(@Query('query') query: string) {
    if (!query) return [];
    return this.deliveryService.searchCities(query);
  }

  @Get('warehouses')
  @ApiOperation({ summary: 'Get Nova Poshta warehouses for a city' })
  getWarehouses(@Query('cityRef') cityRef: string) {
    if (!cityRef) return [];
    return this.deliveryService.getWarehouses(cityRef);
  }
}
