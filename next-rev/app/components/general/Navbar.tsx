import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="py-5 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            Blog <span className="text-blue-500">Singh</span>
          </h1>
        </Link>

        <div className="hidden sm:flex gap-6 items-center">
            <Link className="text-sm font-medium hover:text-blue-500 transition" href={"/home"}>
            Home
            </Link>
            <Link className="text-sm font-medium hover:text-blue-500 transition" href={"/dashboard"}>
            Dashboard
            </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button>Login</Button>
        <Button variant={"secondary"}>Sign up</Button>
      </div>
    </nav>
  );
}
