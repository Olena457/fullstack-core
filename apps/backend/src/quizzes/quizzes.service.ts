import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizInput } from './schemas/quiz.schema';
import { QuestionType } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizInput) {
    return this.prisma.quiz.create({
      data: {
        title: createQuizDto.title,
        questions: {
          create: createQuizDto.questions.map((question) => ({
            type: question.type as QuestionType,
            text: question.text,
            options: question.type === 'CHECKBOX' ? question.options : [],
            correctAnswer: question.correctAnswer,
          })),
        },
      },
      include: {
        questions: true,
      },
    });
  }

  async findAll() {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
      createdAt: quiz.createdAt,
    }));
  }

  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    return quiz;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.quiz.delete({ where: { id } });
    return { message: 'Quiz deleted successfully' };
  }
}
