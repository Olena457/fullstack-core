import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser {
  user?: {
    id?: string;
    sub?: string;
    userId?: string;
  };
}

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: RequestWithUser, @Body() createReviewDto: CreateReviewDto) {
    const userId = req.user?.id || req.user?.sub || req.user?.userId;

    if (!userId) {
      console.error('Failed to find user ID in token. req.user payload:', req.user);
      throw new UnauthorizedException('Invalid user token payload');
    }

    return this.reviewsService.create(createReviewDto, userId);
  }

  @Get()
  findAllReviewsDefault() {
    return this.reviewsService.findAllStoreReviews();
  }

  @Get('store')
  findAllStoreReviews() {
    return this.reviewsService.findAllStoreReviews();
  }

  @Get('product/:productId')
  findAllByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findAllByProduct(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.remove(id);
  }
}
