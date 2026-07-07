import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Quiz Builder API')
    .setDescription('API documentation for the Quiz Builder application')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('quizzes')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`Server running: http://localhost:${port}`);
  console.log(`Swagger: http://localhost:${port}/api-docs`);
}

bootstrap().catch((err: unknown) => {
  console.error('Error during application bootstrap', err);
  process.exit(1);
});
