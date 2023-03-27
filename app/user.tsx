"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return <p>{JSON.stringify(session)}</p>;
};
