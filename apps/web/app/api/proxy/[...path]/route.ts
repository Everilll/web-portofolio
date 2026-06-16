import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function handleProxy(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await props.params;
    const cleanPath = path.join('/');
    const searchParams = new URL(request.url).search;
    const destUrl = `${API_URL}/${cleanPath}${searchParams}`;

    // Copy incoming headers
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (k !== 'host' && k !== 'connection' && k !== 'cookie' && k !== 'content-length') {
        headers.set(key, value);
      }
    });

    // Inject Bearer token from httpOnly cookie if present
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Prepare body for mutations
    let body: BodyInit | undefined = undefined;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.arrayBuffer();
    }

    const response = await fetch(destUrl, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
    });

    const resBody = await response.arrayBuffer();
    const resHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      // Skip content-encoding to avoid issues if next/vercel compresses it again
      if (k !== 'content-encoding' && k !== 'transfer-encoding') {
        resHeaders.set(key, value);
      }
    });

    return new NextResponse(resBody, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders,
    });
  } catch (error: any) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: error.message || 'Internal proxy error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, props);
}

export async function POST(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, props);
}

export async function PUT(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, props);
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, props);
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ path: string[] }> }) {
  return handleProxy(request, props);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
