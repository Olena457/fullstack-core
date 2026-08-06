import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WebhookService {
  private stripe: Stripe;
  private readonly logger = new Logger(WebhookService.name);

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const stripeSecret = this.configService.get<string>('STRIPE_SECRET_KEY');

    this.stripe = new Stripe(stripeSecret || '', {
      apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
    });
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret || '');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      this.logger.error(`Webhook signature verification failed: ${errorMessage}`);
      throw new BadRequestException(`Webhook Error: ${errorMessage}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      this.logger.log(`Payment successful for session ID: ${session.id}`);

      const orderId = session.client_reference_id;

      if (orderId) {
        try {
          await this.prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'PAID',
            },
          });
          this.logger.log(`Order ${orderId} successfully marked as PAID`);
        } catch (dbError: unknown) {
          const dbErrorMessage =
            dbError instanceof Error ? dbError.message : 'Unknown database error';
          this.logger.error(`Failed to update order ${orderId} in database: ${dbErrorMessage}`);
        }
      } else {
        this.logger.warn(`No client_reference_id found in session ${session.id}`);
      }
    }

    return { received: true };
  }
}
