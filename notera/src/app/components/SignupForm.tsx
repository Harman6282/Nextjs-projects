"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(formData)

    try {
       await axios.post("/api/register", formData);

      router.push("/api/auth/signin");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
        >
           Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>


      <div>
        <label
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/api/auth/signin" className="text-blue-600 hover:text-blue-500">
          Sign in
        </Link>
      </div>
    </form>
  );
}
