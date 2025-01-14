"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();
  return (
    <div>
      <div className="flex justify-between">
        <div>Muzi</div>
        <div>
          {session.data?.user && (
            <button
              className="m-2 p-2 bg-gray-800 text-white rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          )}

          {!session.data?.user && (
            <button
              className="m-2 p-2 bg-black text-white rounded"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
