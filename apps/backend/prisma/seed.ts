import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('Password1!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'buyer@store.app' },
    update: {},
    create: {
      email: 'buyer@store.app',
      password: hashedPassword,
      name: 'Test Buyer',
    },
  });

  await prisma.product.deleteMany();

  const productsData = [
    {
      title: 'Neon Drift Low-Top Sneakers',
      price: 115.0,
      imageUrl:
        'https://images.unsplash.com/photo-1624911104820-5316c700b907?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['White', 'Grey'],
    },
    {
      title: 'Vintage Wash Everyday Denim',
      price: 89.99,
      imageUrl:
        'https://images.unsplash.com/photo-1602078019624-f4355d0687fd?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue'],
    },
    {
      title: 'Urban Pulse Oversized Hoodie',
      price: 65.0,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1688497831535-120bd47d9f9c?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey'],
    },
    {
      title: 'Concrete Jungle Essential Jacket',
      price: 145.5,
      imageUrl:
        'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Navy', 'Black'],
    },
    {
      title: 'Stealth Mode Cargo Pants',
      price: 95.0,
      imageUrl:
        'https://images.unsplash.com/photo-1698819718444-0d59d1011410?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Green'],
    },
    {
      title: 'Distressed Blue Street Jeans',
      price: 78.99,
      imageUrl:
        'https://images.unsplash.com/photo-1589712186148-03ec318289c0?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'Black'],
    },
    {
      title: 'Monochrome Knit Beanie',
      price: 24.99,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1681494700976-861938fe0513?auto=format&fit=crop&w=800&q=80',
      sizes: ['Unisex'],
      colors: ['Grey', 'Black'],
    },
    {
      title: 'Classic Navy Crew Tee',
      price: 29.99,
      imageUrl:
        'https://images.unsplash.com/photo-1650590122055-576096fde8f9?auto=format&fit=crop&w=800&q=80',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Navy', 'White'],
    },
    {
      title: 'Retro Flare Denim Trousers',
      price: 85.0,
      imageUrl:
        'https://images.unsplash.com/photo-1586231912972-d0970f9ce787?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue'],
    },
    {
      title: 'High-Top Crimson Sneakers',
      price: 130.0,
      imageUrl:
        'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Red', 'Black'],
    },
    {
      title: 'Cyberpunk Utility Vest',
      price: 110.0,
      imageUrl:
        'https://images.unsplash.com/photo-1761167474127-1c6e596ecea6?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L'],
      colors: ['Black'],
    },
    {
      title: 'Frayed Edge Street Denims',
      price: 92.5,
      imageUrl:
        'https://images.unsplash.com/photo-1599681906238-c4f97c8b4454?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue'],
    },
    {
      title: 'Midnight Essential Tee',
      price: 34.0,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1664267832256-176e55ccafd0?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
    },
    {
      title: 'Graphic Print Designer Tee',
      price: 45.0,
      imageUrl:
        'https://images.unsplash.com/photo-1687093875330-180f8be8d8fa?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'White'],
    },
    {
      title: 'Crimson Peak Puffer Jacket',
      price: 210.0,
      imageUrl:
        'https://images.unsplash.com/photo-1511474130345-b32b55925dd2?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Red'],
    },
    {
      title: 'Thermal Red Pullover',
      price: 68.0,
      imageUrl:
        'https://images.unsplash.com/photo-1542327534-59a1fe8daf73?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Red'],
    },
    {
      title: 'Tritone Tracksuit Set',
      price: 140.0,
      imageUrl:
        'https://images.unsplash.com/photo-1700026707404-f98576866362?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Red', 'White', 'Black'],
    },
    {
      title: 'Dusty Wash Denim Shorts',
      price: 45.99,
      imageUrl:
        'https://images.unsplash.com/photo-1779040619806-b6261ed20890?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Grey', 'Blue'],
    },
    {
      title: 'Street Canvas Button-Up',
      price: 55.0,
      imageUrl:
        'https://images.unsplash.com/photo-1766193228596-9b2d8ed3c07c?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['White', 'Navy'],
    },
    {
      title: 'Signature Black T-Shirt',
      price: 32.0,
      imageUrl:
        'https://images.unsplash.com/photo-1599423843019-c2f2d870ea0a?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black'],
    },
    {
      title: 'Retro Runner Lifestyle Kicks',
      price: 125.0,
      imageUrl:
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['White', 'Grey'],
    },
    {
      title: 'Crimson Padded Coat',
      price: 199.99,
      imageUrl:
        'https://images.unsplash.com/photo-1611099573232-1b7b44fdbcef?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Red'],
    },
    {
      title: 'Indigo Floral Light Jacket',
      price: 110.0,
      imageUrl:
        'https://images.unsplash.com/photo-1777447458933-2218988a9591?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'White'],
    },
    {
      title: 'Pure White Basic Tee',
      price: 25.0,
      imageUrl:
        'https://images.unsplash.com/photo-1616006897093-5e4635c0de35?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White'],
    },
  ];

  await prisma.product.createMany({
    data: productsData,
  });

  console.log('E-commerce seed completed with 24 custom items.');
  console.log(`Test user: ${user.email} / Password1!`);
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
