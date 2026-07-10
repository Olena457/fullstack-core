import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new checkout order' })
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() userId: string) {
    return this.ordersService.create(createOrderDto, userId);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current user order history' })
  findAllByUser(@CurrentUser() userId: string) {
    return this.ordersService.findAllByUser(userId);
  }
}
