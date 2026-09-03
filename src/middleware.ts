import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "https://alexadevsrm.com",
  "https://www.alexadevsrm.com",
  ...(process.env.ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? []),
]);

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://cdn.sanity.io https://*.supabase.co https://api.qrserver.com",
    "connect-src 'self' https://*.supabase.co https://*.vercel.app https://*.onrender.com https://*.leapcell.dev https://*.sanity.io https://*.api.sanity.io",
    "frame-src 'self' https://lu.ma",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

export function middleware(request: NextRequest) {
  const { search } = request.nextUrl;
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin =
    origin === request.nextUrl.origin || ALLOWED_ORIGINS.has(origin);
  const isStateChangingRequest = ["POST", "PUT", "PATCH", "DELETE"].includes(
    request.method
  );

  const isRscRequest = search.includes("_rsc=");
  const isExternalOrigin = origin && !isAllowedOrigin;

  if (
    isExternalOrigin &&
    (isRscRequest || isStateChangingRequest || request.method === "OPTIONS")
  ) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const response = NextResponse.next();

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (origin) {
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Vary", "Origin");
    } else {
      response.headers.delete("Access-Control-Allow-Origin");
    }
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400",
        ...Object.fromEntries(response.headers),
      },
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
