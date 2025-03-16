import { promises as fs } from 'fs';
import path from 'path';
import { Property } from '../../../types/property.types'
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const filePath = path.join(process.cwd(), 'properties.json');
    const fileContents = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data: Property[] = JSON.parse(fileContents);

    if (!data) {
      throw new Error('Failed to fetch properties');
    }

    return new Response(JSON.stringify({ data: data?.slice(0, 100) }), {
    headers: { "Content-Type": "application/json" },
  });
  } catch (error) {
    console.error('Error fetching properties data:', error);
    return new Response(JSON.stringify({ error: JSON.stringify(error) }), {
    headers: { "Content-Type": "application/json" },
  });
  }
}
