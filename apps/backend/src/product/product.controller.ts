import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('gender') gender?: string,
    @Query('color') color?: string,
    @Query('size') size?: string,
  ) {
    return this.productService.findAll(
      page ? Number(page) : 1,
      limit ? Number(limit) : 9,
      search,
      sort,
      gender,
      color,
      size,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
}
