import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Note this is the way to create protected routes with server components
  // const session = await getServerSession(authOptions);

  // if (!session) {
  // //   Note that redirect is better here instead of router.push()
  //   redirect("/api/auth/signin");
  // }

  // You can also use the `useSession` hook for the client side components
  // Also middleware can be used to create multiple protect routes at the same time.

  return <h1>Super Secret Page</h1>;
}
