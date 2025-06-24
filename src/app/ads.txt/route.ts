import { NextResponse } from 'next/server';

export async function GET() {
  const adsTxtContent = `google.com, pub-4742409395558588, DIRECT, f08c47fec0942fa0`;

  return new NextResponse(adsTxtContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache por 24 horas
    },
  });
} 