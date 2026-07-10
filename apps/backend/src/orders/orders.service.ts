import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const productIds = createOrderDto.items.map((item) => item.productId);

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products from the cart were not found');
    }

    let totalPrice = 0;
    const orderItemsData = createOrderDto.items.map((item) => {
      const dbProduct = products.find((p) => p.id === item.productId);
      totalPrice += dbProduct!.price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
      };
    });

    totalPrice = Number(totalPrice.toFixed(2));

    return this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: 'PENDING',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
