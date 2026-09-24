import { NextResponse } from "next/server";

/**
 * POST /api/alexaverse/register/solo
 *
 * Server-side proxy for the backend solo-registration endpoint.
 * The real backend URL is kept in the server-only env variable API_URL,
 * so it is never inlined into the client JS bundle.
 */
export async function POST(req: Request) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    console.error("[proxy] API_URL is not set on the server");
    return NextResponse.json(
      { success: false, message: "Server configuration error." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${apiUrl}/register/solo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: unknown = await upstream.json().catch(() => null);

    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    console.error("[proxy] /register/solo upstream error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to reach registration service. Please try again." },
      { status: 502 },
    );
  }
}
