import {
  Controller,
  Post,
  Headers,
  Req,
  BadRequestException,
  type RawBodyRequest,
} from '@nestjs/common';
import type { Request } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    if (!req.rawBody) {
      throw new BadRequestException('Missing raw body');
    }

    return this.webhookService.handleStripeWebhook(signature, req.rawBody);
  }
}
