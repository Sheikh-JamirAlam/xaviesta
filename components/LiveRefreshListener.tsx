/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClientBrowser } from "@/lib/supabase/browser";

export default function LiveRefreshListener() {
  const router = useRouter();
  const isRefreshingRef = useRef(false);
  const supabase = createClientBrowser();

  useEffect(() => {
    const channel = supabase
      .channel("app-state-refresh")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "app_state",
        },
        () => {
          if (isRefreshingRef.current) return;

          isRefreshingRef.current = true;

          router.refresh();

          setTimeout(() => {
            isRefreshingRef.current = false;
          }, 1000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
