import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { IHistory, MistralResponse } from './ai.types';

@Injectable()
export class AiService {
  private readonly apiUrl = 'https://api.mistral.ai/v1/chat/completions';
  private readonly apiKey = process.env.MISTRAL_API_KEY;

  constructor(private prisma: PrismaService) {}

  async generateChatResponse(question: string, history: IHistory[] = []): Promise<string> {
    const fallbackMessage = 'Sorry, our stylist is temporarily unavailable. Try again later!';

    try {
      const products = await this.prisma.product.findMany({
        take: 20,
        select: {
          title: true,
          price: true,
          tags: true,
          sizes: true,
          colors: true,
          gender: true,
        },
      });

      const productContext = products.map((p) => ({
        name: p.title,
        price: `$${p.price}`,
        gender: p.gender,
        tags: p.tags,
        sizes: p.sizes,
        colors: p.colors,
      }));

      const systemInstruction = `
        Identity: You are a professional AI styling assistant for a modern streetwear clothing brand.
        
        DATA SOURCE (Available Catalog):
        ${JSON.stringify(productContext)}
        
        STRICT RULES:
        1. LANGUAGE: Respond in the same language the user writes to you.
        2. CONTEXT LOGIC: Use the "tags" array to find NEW, SALE, OVERSIZE, TOP, ECO items. Use the "gender" field to recommend Women's, Men's, or Unisex items.
        3. EMOJIS: Use emojis sparingly (max 1-2 per message) to keep a clean, modern aesthetic (e.g., 🔥, 🏷️, 🖤, 🆕).
        4. TONE: Confident, helpful, minimalistic streetwear vibe. Bold **Product Names** and **Prices**.
        5. HONESTY: Do NOT invent products, sizes, or colors that are not in the DATA SOURCE.
      `;

      const messages = [
        { role: 'system', content: systemInstruction },
        ...history,
        { role: 'user', content: question },
      ];

      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'open-mistral-7b',
          messages: messages,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        console.error('Mistral API Error:', await res.text());
        return fallbackMessage;
      }

      const data = (await res.json()) as MistralResponse;
      return data.choices[0]?.message?.content || fallbackMessage;
    } catch (error) {
      console.error('AI Service Exception:', error);
      return fallbackMessage;
    }
  }
}
