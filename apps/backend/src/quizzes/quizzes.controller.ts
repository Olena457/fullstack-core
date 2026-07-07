import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { createQuizSchema } from './schemas/quiz.schema';
import type { CreateQuizInput } from './schemas/quiz.schema';
import { YupValidationPipe } from '../common/pipes/yup-validation.pipe';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('quizzes')
@Controller('quizzes')
@Public()
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @UsePipes(new YupValidationPipe(createQuizSchema))
  create(@Body() createQuizDto: CreateQuizInput) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes with question counts' })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz details by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.remove(id);
  }
}
