"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  return (
    <div className="flex p-4 justify-between border-b fixed w-full">
      <div className="text-2xl">Notera</div>
      <div>
        {status === "authenticated" && (
          <button
            onClick={() => signOut()}
            className="border-white border rounded-lg py-1 px-5 "
          >
            Logout
          </button>
        )}
        {status !== "authenticated" && (
          <button
            onClick={() => signIn()}
            className="bg-white text text-black py-1 px-5 rounded-lg"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}
