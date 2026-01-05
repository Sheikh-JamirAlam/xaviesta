"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function RefreshButton() {
  const [loading, setLoading] = useState(false);

  async function refreshClient() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/refresh-client", {
        method: "PUT",
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Failed to refresh client");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={refreshClient} disabled={loading} className="mt-4 p-5 text-xl cursor-pointer">
      {loading ? "Refreshing…" : "Refresh Client"}
    </Button>
  );
}
