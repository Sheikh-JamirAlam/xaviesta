"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="w-80 rounded border p-6 space-y-4">
        <h1 className="text-xl font-semibold text-center">Admin Login</h1>

        <input placeholder="Username" className="w-full border px-3 py-2" onChange={(e) => setUsername(e.target.value)} />

        <input type="password" placeholder="Password" className="w-full border px-3 py-2" onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-black text-white py-2">Login</button>
      </form>
    </div>
  );
}
