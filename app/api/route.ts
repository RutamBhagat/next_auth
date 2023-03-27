import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";

export async function GET(request: Request) {
  // Note this is the way to create protected routes with server components
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  
  // You can also use the `useSession` hook for the client side components
  // Also middleware can be used to create multiple protect routes at the same time.

  console.log("GET API", session);
  return NextResponse.json({ authenticated: !!session });
}
