import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiGetMe } from '@/lib/api/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json(
        { statusCode: 401, message: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }

    // Call NestJS backend with the extracted token
    const admin = await apiGetMe({ token });

    return NextResponse.json({
      statusCode: 200,
      message: 'Admin profile retrieved successfully',
      data: admin,
    });
  } catch (error: any) {
    console.error('Auth Me Route Handler Error:', error);
    return NextResponse.json(
      {
        statusCode: error.status || 401,
        message: error.message || 'Unauthorized',
      },
      { status: error.status || 401 }
    );
  }
}
