import { Controller, Get, Post, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @ApiOperation({ summary: 'Create a new checkout order and return Stripe session URL' })
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() userId: string) {
    return this.ordersService.create(createOrderDto, userId);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get current user order history' })
  findAllByUser(@CurrentUser() userId: string) {
    return this.ordersService.findAllByUser(userId);
  }

  @Get('all')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all orders (Admin only)' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(':id/status')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update order status (Admin only)' })
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus) {
    return this.ordersService.updateStatus(id, status);
  }
}
