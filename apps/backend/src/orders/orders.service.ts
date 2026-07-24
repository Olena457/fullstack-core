import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import Stripe from 'stripe';

@Injectable()
export class OrdersService {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
    });
  }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const productIds = createOrderDto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products were not found');
    }

    let totalPrice = 0;

    const stripeLineItems = createOrderDto.items.map((item) => {
      const dbProduct = products.find((p) => p.id === item.productId);

      if (!dbProduct) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      totalPrice += dbProduct.price * item.quantity;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${dbProduct.title} ${item.size ? `(Size: ${item.size})` : ''}`,
            images: [dbProduct.imageUrl],
          },
          unit_amount: Math.round(dbProduct.price * 100),
        },
        quantity: item.quantity,
      };
    });

    totalPrice = Number(totalPrice.toFixed(2));

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: 'PENDING',
        firstName: createOrderDto.firstName,
        lastName: createOrderDto.lastName,
        email: createOrderDto.email,
        phone: createOrderDto.phone,
        npCity: createOrderDto.npCity,
        npBranch: createOrderDto.npBranch,
        items: {
          create: createOrderDto.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        },
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: stripeLineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?order_id=${order.id}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      client_reference_id: order.id,
    });

    return { url: session.url };
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
