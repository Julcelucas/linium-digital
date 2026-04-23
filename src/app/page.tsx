"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, seedDemoUsers } from "@/lib/mock-auth";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      seedDemoUsers();
    } catch {
      // Ignorar erro se não estiver no browser
    }

    const user = getCurrentUser();

    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F4F6F9" }}
    >
      <p className="text-sm" style={{ color: "#7F8C8D" }}>
        A carregar...
      </p>
    </div>
  );
}

