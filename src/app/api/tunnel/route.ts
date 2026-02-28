import { NextResponse } from "next/server";

/**
 * GET /api/tunnel
 *
 * Queries the ngrok local API (http://127.0.0.1:4040) to find the active
 * public HTTPS tunnel URL. Returns it so the client can build the QR code
 * even when browsing via localhost.
 */
export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:4040/api/tunnels", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "ngrok API not reachable" },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Find the HTTPS tunnel
    const httpsTunnel = data.tunnels?.find(
      (t: { proto: string; public_url: string }) =>
        t.proto === "https"
    );

    if (!httpsTunnel) {
      return NextResponse.json(
        { error: "No active HTTPS tunnel found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ url: httpsTunnel.public_url });
  } catch {
    // ngrok is not running
    return NextResponse.json(
      { error: "ngrok is not running. Start it with: ngrok http 3000" },
      { status: 503 }
    );
  }
}
