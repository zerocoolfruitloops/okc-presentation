import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Read the version file at runtime
    const versionPath = path.join(process.cwd(), 'public', 'version.json');
    const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf-8'));
    
    return NextResponse.json(versionData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Version not found', buildTime: 'unknown' },
      { status: 500 }
    );
  }
}
