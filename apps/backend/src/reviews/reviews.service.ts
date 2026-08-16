import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import sanitizeHtml from 'sanitize-html';
@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    const cleanText = sanitizeHtml(createReviewDto.text, {
      allowedTags: [],
      allowedAttributes: {},
    });

    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        text: cleanText,
        userId: userId,
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  }

  async findAllByProduct(productId: string) {
    return this.prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllStoreReviews() {
    return this.prisma.review.findMany({
      where: { productId: null },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    await this.prisma.review.delete({ where: { id } });
    return { message: 'Review deleted successfully' };
  }
}
