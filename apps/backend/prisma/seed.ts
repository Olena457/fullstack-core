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

  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating test users...');
  const user1 = await prisma.user.create({
    data: {
      email: 'buyer@store.app',
      password: hashedPassword,
      name: 'Test Buyer',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'reviewer@store.app',
      password: hashedPassword,
      name: 'Anna Style',
    },
  });

  console.log('Adding products with English descriptions...');
  const productsData = [
    {
      sku: 'ALT-SNK-001',
      title: 'Neon Drift Low-Top Sneakers',
      price: 115.0,
      oldPrice: 150.0,
      imageUrl:
        'https://images.unsplash.com/photo-1624911104820-5316c700b907?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Grey', 'Green'],
      gender: 'Unisex',
      description:
        'Engineered for the streets. Features reflective neon details and a rugged sole. Made in Italy with premium recycled materials.',
    },
    {
      sku: 'ALT-DNM-002',
      title: 'Vintage Wash Everyday Denim',
      price: 89.99,
      imageUrl:
        'https://images.unsplash.com/photo-1602078019624-f4355d0687fd?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black'],
      gender: "Men's",
      description:
        'A timeless classic reconstructed. Hand-distressed vintage wash denim with a relaxed fit. High-quality 14oz denim. Made in Morocco.',
    },
    {
      sku: 'ALT-HOD-003',
      title: 'Urban Pulse Oversized Hoodie',
      price: 65.0,
      oldPrice: 95.0,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1688497831535-120bd47d9f9c?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Grey', 'Navy'],
      gender: 'Unisex',
      description:
        'Your new armor. Heavyweight cotton fleece with an oversized boxy fit. Printed with eco-friendly water-based inks.',
    },
    {
      sku: 'ALT-JKT-004',
      title: 'Concrete Jungle Essential Jacket',
      price: 145.5,
      imageUrl:
        'https://images.unsplash.com/photo-1542406775-ade58c52d2e4?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Navy', 'Black', 'Grey'],
      gender: "Men's",
      description:
        'Defy the elements. Water-resistant outer shell with tactical pockets. 100% ripstop nylon. Designed and tested in Germany.',
    },
    {
      sku: 'ALT-CRG-005',
      title: 'Stealth Mode Cargo Pants',
      price: 95.0,
      oldPrice: 120.0,
      imageUrl:
        'https://images.unsplash.com/photo-1698819718444-0d59d1011410?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Green', 'Grey'],
      gender: "Men's",
      description:
        'Maximum utility meets modern cut. Military-grade cargo pockets. PFC-free water-repellent coating. Made in Italy.',
    },
    {
      sku: 'ALT-DNM-006',
      title: 'Distressed Blue Street Jeans',
      price: 78.99,
      imageUrl:
        'https://images.unsplash.com/photo-1589712186148-03ec318289c0?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'Black'],
      gender: "Women's",
      description:
        'Raw and unapologetic. High-waisted street denim. 100% organic cotton without elastane for an authentic look. Made in Portugal.',
    },
    {
      sku: 'ALT-BNI-007',
      title: 'Monochrome Knit Beanie',
      price: 24.99,
      oldPrice: 35.0,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1681494700976-861938fe0513?auto=format&fit=crop&w=800&q=80',
      sizes: ['Unisex'],
      colors: ['Grey', 'Black', 'Navy', 'Red'],
      gender: 'Unisex',
      description:
        'The finishing touch. Ribbed beanie made from 50% merino wool and 50% acrylic for durability. Seamless technology.',
    },
    {
      sku: 'ALT-TEE-008',
      title: 'Classic Navy Crew Tee',
      price: 29.99,
      imageUrl:
        'https://images.unsplash.com/photo-1650590122055-576096fde8f9?auto=format&fit=crop&w=800&q=80',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Navy', 'White', 'Black'],
      gender: 'Unisex',
      description:
        'The foundation of your wardrobe. Premium 100% combed cotton. Basic boxy fit. Dyed with eco-friendly pigments.',
    },
    {
      sku: 'ALT-TRS-009',
      title: 'Retro Flare Denim Trousers',
      price: 85.0,
      imageUrl:
        'https://images.unsplash.com/photo-1586231912972-d0970f9ce787?auto=format&fit=crop&w=800&q=80',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Blue', 'Black'],
      gender: "Women's",
      description:
        'Nostalgia reimagined. Flattering high-rise waist with a dramatic 70s-inspired flare cut. Stretchy fabric. Made in Morocco.',
    },
    {
      sku: 'ALT-SNK-010',
      title: 'High-Top Crimson Sneakers',
      price: 130.0,
      oldPrice: 180.0,
      imageUrl:
        'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Red', 'Black', 'White'],
      gender: "Men's",
      description:
        'Make a statement. Bold high-top silhouette with premium vegan leather overlays and durable polyurethane sole.',
    },
    {
      sku: 'ALT-VST-011',
      title: 'Cyberpunk Utility Vest',
      price: 110.0,
      imageUrl:
        'https://images.unsplash.com/photo-1761167474127-1c6e596ecea6?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Grey'],
      gender: 'Unisex',
      description:
        'Techwear at its peak. Modular tactical vest equipped with heavy-duty webbing. Cordura 500D fabric. Made in Germany.',
    },
    {
      sku: 'ALT-DNM-012',
      title: 'Frayed Edge Street Denims',
      price: 92.5,
      imageUrl:
        'https://images.unsplash.com/photo-1599681906238-c4f97c8b4454?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'Grey'],
      gender: "Men's",
      description:
        'Built for movement. Slightly tapered leg with aggressive frayed edge detailing. Vintage hand-distressed finish.',
    },
    {
      sku: 'ALT-TEE-013',
      title: 'Midnight Essential Tee',
      price: 34.0,
      oldPrice: 45.0,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1664267832256-176e55ccafd0?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy'],
      gender: "Men's",
      description:
        'Minimalist perfection. Pre-shrunk mid-weight jersey cotton. Smooth texture thanks to mercerization. Made in Italy.',
    },
    {
      sku: 'ALT-TEE-014',
      title: 'Graphic Print Designer Tee',
      price: 45.0,
      imageUrl:
        'https://images.unsplash.com/photo-1687093875330-180f8be8d8fa?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Red'],
      gender: 'Unisex',
      description:
        'Wearable art. Features an exclusive high-density plastisol print. Pattern applied with fade-resistant eco-inks.',
    },
    {
      sku: 'ALT-JKT-015',
      title: 'Crimson Peak Puffer Jacket',
      price: 210.0,
      imageUrl:
        'https://images.unsplash.com/photo-1511474130345-b32b55925dd2?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L'],
      colors: ['Red', 'Black'],
      gender: "Women's",
      description:
        'Command attention. Extreme oversized puffer jacket. 100% recycled eco-down (Thermolite) filling. Rated for sub-zero temperatures.',
    },
    {
      sku: 'ALT-PUL-016',
      title: 'Thermal Red Pullover',
      price: 68.0,
      oldPrice: 85.0,
      imageUrl:
        'https://images.unsplash.com/photo-1542327534-59a1fe8daf73?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Red', 'Black', 'Grey'],
      gender: 'Unisex',
      description:
        'Stay heated. Constructed from waffle-knit thermal fabric. Breathable and warm. Comfort-fit silhouette.',
    },
    {
      sku: 'ALT-TRK-017',
      title: 'Tritone Tracksuit Set',
      price: 140.0,
      imageUrl:
        'https://images.unsplash.com/photo-1700026707404-f98576866362?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Red', 'White', 'Black'],
      gender: "Men's",
      description:
        'Sportswear elevated. Two-piece set with striking color-blocking. Heavyweight tricot knit. Made in Morocco.',
    },
    {
      sku: 'ALT-SHR-018',
      title: 'Dusty Wash Denim Shorts',
      price: 45.99,
      imageUrl:
        'https://images.unsplash.com/photo-1779040619806-b6261ed20890?auto=format&fit=crop&w=800&q=80',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Grey', 'Blue', 'Black'],
      gender: "Women's",
      description:
        'Summer staple. Heavily washed denim offering a vintage feel. Enzyme-washed for maximum softness.',
    },
    {
      sku: 'ALT-SHR-019',
      title: 'Street Canvas Button-Up',
      price: 55.0,
      oldPrice: 70.0,
      imageUrl:
        'https://images.unsplash.com/photo-1766193228596-9b2d8ed3c07c?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['White', 'Navy', 'Green'],
      gender: "Men's",
      description: 'Sharp but relaxed. Heavy cotton canvas shirt jacket. Breathable mesh lining.',
    },
    {
      sku: 'ALT-TEE-020',
      title: 'Signature Black T-Shirt',
      price: 32.0,
      imageUrl:
        'https://images.unsplash.com/photo-1599423843019-c2f2d870ea0a?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black'],
      gender: 'Unisex',
      description:
        'The only black tee you will ever need. Tonal embroidered logo. 100% Egyptian cotton. Made in Italy.',
    },
    {
      sku: 'ALT-SNK-021',
      title: 'Retro Runner Lifestyle Kicks',
      price: 125.0,
      imageUrl:
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
      sizes: ['M', 'L', 'XL'],
      colors: ['White', 'Grey', 'Navy'],
      gender: 'Unisex',
      description:
        'Old school soul, modern tech. Suede and mesh upper combined with a shock-absorbing EVA midsole. Breathable lining.',
    },
    {
      sku: 'ALT-COA-022',
      title: 'Crimson Padded Coat',
      price: 199.99,
      oldPrice: 280.0,
      imageUrl:
        'https://images.unsplash.com/photo-1611099573232-1b7b44fdbcef?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Red', 'Black'],
      gender: "Men's",
      description:
        'Winter-proof your fit. Weather-resistant shell. Utilizes thermoregulation technology developed in Germany.',
    },
    {
      sku: 'ALT-JKT-023',
      title: 'Indigo Floral Light Jacket',
      price: 110.0,
      imageUrl:
        'https://images.unsplash.com/photo-1777447458933-2218988a9591?auto=format&fit=crop&w=800&q=80',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Blue', 'White'],
      gender: "Women's",
      description:
        'Street meets botanical. Lightweight windbreaker with unique digital sublimation floral print.',
    },
    {
      sku: 'ALT-TEE-024',
      title: 'Pure White Basic Tee',
      price: 25.0,
      imageUrl:
        'https://images.unsplash.com/photo-1616006897093-5e4635c0de35?auto=format&fit=crop&w=800&q=80',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Grey'],
      gender: 'Unisex',
      description:
        'Clean and crisp. Crafted from breathable, thick-gauge cotton with a seamless construction for perfect fit.',
    },
  ];

  await prisma.product.createMany({
    data: productsData,
  });

  console.log(' Creating reviews...');
  const hoodie = await prisma.product.findUnique({ where: { sku: 'ALT-HOD-003' } });
  const pants = await prisma.product.findUnique({ where: { sku: 'ALT-CRG-005' } });
  const jacket = await prisma.product.findUnique({ where: { sku: 'ALT-JKT-004' } });

  if (hoodie && pants && jacket) {
    await prisma.review.createMany({
      data: [
        {
          text: 'The quality of the clothing is exceptional. I love the sustainable approach and eco-friendly dyes.',
          rating: 5,
          userId: user1.id,
          productId: hoodie.id,
        },
        {
          text: 'Shipping was super fast and packaging was completely plastic-free. Great customer service!',
          rating: 5,
          userId: user2.id,
          productId: pants.id,
        },
        {
          text: 'I caught their seasonal sale and got incredible value. Best online store for high-end streetwear.',
          rating: 5,
          userId: user1.id,
          productId: jacket.id,
        },
        {
          text: 'Everything I ordered arrived on time. The product details are accurate and the service is reliable.',
          rating: 5,
          userId: user2.id,
          productId: hoodie.id,
        },
        {
          text: 'Excellent service! They notified me immediately when my size was back in stock.',
          rating: 5,
          userId: user1.id,
          productId: pants.id,
        },
      ],
    });
  }

  console.log('E-commerce seed completed.');
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
