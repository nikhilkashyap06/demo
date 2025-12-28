import { NextResponse, type NextRequest } from 'next/server';

function getEnvCredentials() {
  const username = process.env.ADMIN_USERNAME || '';
  const password = process.env.ADMIN_PASSWORD || '';
  return { username, password };
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const envCreds = getEnvCredentials();

    // Dev bypass: accept any non-empty credentials in development
    if (process.env.NODE_ENV !== 'production') {
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { username }
      });
      response.cookies.set('adminToken', 'admin-session-token', {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 60 * 60
      });
      return response;
    }

    if (!envCreds) {
      return NextResponse.json(
        { message: 'Admin credentials are not configured' },
        { status: 500 }
      );
    }

    if (username === envCreds.username && password === envCreds.password) {
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { username: envCreds.username }
      });
      response.cookies.set('adminToken', 'admin-session-token', {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 60 * 60
      });
      return response;
    } else {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
