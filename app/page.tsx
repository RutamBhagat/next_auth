import { Inter } from "next/font/google";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <h1>Server Session</h1>
      <p>{JSON.stringify(session)}</p>
      <h1>Client Call</h1>
      <User />
    </main>
  );
}
