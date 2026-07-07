import 'dotenv/config';
import { PrismaClient, QuestionType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('Password1!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@quiz.app' },
    update: {},
    create: {
      email: 'demo@quiz.app',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  const existingQuiz = await prisma.quiz.findFirst({
    where: { title: 'JavaScript Basics' },
  });

  if (!existingQuiz) {
    await prisma.quiz.create({
      data: {
        title: 'JavaScript Basics',
        questions: {
          create: [
            {
              type: QuestionType.BOOLEAN,
              text: 'JavaScript is a statically typed language.',
              options: [],
              correctAnswer: ['false'],
            },
            {
              type: QuestionType.INPUT,
              text: 'What keyword is used to declare a block-scoped variable in ES6?',
              options: [],
              correctAnswer: ['let'],
            },
            {
              type: QuestionType.CHECKBOX,
              text: 'Which of the following are JavaScript primitive types?',
              options: ['String', 'Array', 'Number', 'Object', 'Boolean'],
              correctAnswer: ['String', 'Number', 'Boolean'],
            },
          ],
        },
      },
    });
  }

  console.log('Seed completed.');
  console.log(`Demo user: ${user.email} / Password1!`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
