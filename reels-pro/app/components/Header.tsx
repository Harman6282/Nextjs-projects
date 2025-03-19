"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return <div>
    <button onClick={handleSignout}>Signout</button>
    <Link href={"/login"}>Login</Link>
    <Link href={"/register"}>Register</Link>
  </div>;
};

export default Header;
