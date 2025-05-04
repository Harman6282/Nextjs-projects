"use client";
import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <div>
      <button
        className="bg-orange-400 rounded-md p-2 cursor-pointer"
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Sign out
      </button>
    </div>
  );
};

export default SignOutButton;
