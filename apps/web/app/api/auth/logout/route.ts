import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');

    return NextResponse.json({
      statusCode: 200,
      message: 'Logout successful',
    });
  } catch (error: any) {
    console.error('Logout Route Handler Error:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: error.message || 'Logout failed',
      },
      { status: 500 }
    );
  }
}
