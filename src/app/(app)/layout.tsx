"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCurrentUser, seedDemoUsers } from "@/lib/mock-auth";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Carregar usuários demo
    try {
      seedDemoUsers();
    } catch {
      // Ignorar erro se não estiver no browser
    }

    // Se utilizador não está autenticado e tenta aceder a area protegida, redirecionar para login
    const user = getCurrentUser();
    if (
      !user &&
      (pathname.startsWith("/dashboard") ||
        pathname.startsWith("/provider") ||
        pathname.startsWith("/bancos"))
    ) {
      router.replace("/login");
    }
  }, [router, pathname]);

  return <>{children}</>;
}
