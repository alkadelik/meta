import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { OpenAI } from 'openai';

@Injectable()
export class ReaderService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async extractFromJsonFile(filePath: string): Promise<any[]> {
    // Resolve absolute file path
    const absolutePath = path.resolve(filePath);

    // Read and parse JSON file
    const raw = fs.readFileSync(absolutePath, 'utf-8');
    const jsonData = JSON.parse(raw);

    if (!jsonData.messages || !Array.isArray(jsonData.messages)) {
      throw new Error('Invalid message file format');
    }

    // Extract only the message contents
    const contents = jsonData.messages
      .filter(msg => msg.content)
      .map(msg => msg.content);

    return this.extractProductsFromMessages(contents);
  }

  private async extractProductsFromMessages(messages: string[]): Promise<any[]> {
    const userContent = messages.join('\n');

    const prompt = `
Extract product names and their prices from the following chat. If price is not available, return null. 
Respond in JSON array format like:
[
  { "product": "Product Name", "price": 12345 },
  ...
]

Chat:
${userContent}
`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that extracts product data from chats.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0,
    });

    const extracted = completion.choices[0].message.content;

    try {
      return JSON.parse(extracted);
    } catch (e) {
      console.error('Failed to parse GPT output:', extracted);
      throw new Error('Invalid GPT response format');
    }
  }
}
