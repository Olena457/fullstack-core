import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Отримання всіх товарів з пагінацією
  async findAll(page: number = 1, limit: number = 12) {
    const skip = (page - 1) * limit;

    const [products, total] = await this.prisma.product
      .findMany({
        skip,
        take: limit,
        orderBy: { title: 'asc' },
      })
      .then(async (data) => [data, await this.prisma.product.count()]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }
}
