import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { apiLogin } from '@/lib/api/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { statusCode: 400, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate with backend API
    const response = await apiLogin({ email, password });
    
    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('accessToken', response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days (matching backend JWT expiry)
    });

    return NextResponse.json({
      statusCode: 200,
      message: 'Login successful',
      data: { email },
    });
  } catch (error: any) {
    console.error('Login Route Handler Error:', error);
    return NextResponse.json(
      {
        statusCode: error.status || 500,
        message: error.message || 'Login failed',
      },
      { status: error.status || 500 }
    );
  }
}
