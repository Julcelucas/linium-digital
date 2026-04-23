"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  logoutMockUser,
  seedDemoUsers,
  type MockUser,
} from "@/lib/mock-auth";
import { roleExperience } from "@/components/dashboard/data";
import { RoleHeader } from "@/components/dashboard/RoleHeader";
import { RoleSidebar } from "@/components/dashboard/RoleSidebar";
import { RoleHero } from "@/components/dashboard/RoleHero";
import { RoleSignals } from "@/components/dashboard/RoleSignals";
import { RoleMetrics } from "@/components/dashboard/RoleMetrics";
import { RoleWorkspace } from "@/components/dashboard/charts";
import { RoleActions } from "@/components/dashboard/RoleActions";
import { CidadaoExplorer } from "../../../components/dashboard/CidadaoExplorer";

export default function DashboardPage() {
  const router = useRouter();
  const sessionRaw = useSyncExternalStore(
    () => () => {},
    () => localStorage.getItem("linium_session"),
    () => null
  );

  const user = useMemo<MockUser | null>(() => {
    if (!sessionRaw) {
      return null;
    }

    try {
      return JSON.parse(sessionRaw) as MockUser;
    } catch {
      return null;
    }
  }, [sessionRaw]);

  useEffect(() => {
    seedDemoUsers();

    if (!user) {
      router.replace("/login");
      return;
    }

    // Verificar periodicamente se a sessão ainda é válida
    const sessionCheck = setInterval(() => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        logoutMockUser();
        router.replace("/login");
      }
    }, 30000); // Verificar a cada 30 segundos

    return () => clearInterval(sessionCheck);
  }, [router, user]);

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F4F6F9" }}
      >
        <p className="text-sm" style={{ color: "#7F8C8D" }}>
          A carregar dashboard...
        </p>
      </div>
    );
  }

  const experience = roleExperience[user.role];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F4F6F9" }}>
      <RoleHeader
        role={user.role}
        onLogout={() => {
          logoutMockUser();
          router.replace("/login");
        }}
      />

      <main className="px-6 md:px-10 py-8">
        {user.role === "cidadao" ? (
          <CidadaoExplorer nome={user.nome} />
        ) : (
          <div className="grid lg:grid-cols-[220px_1fr] gap-4">
            <RoleSidebar role={user.role} experience={experience} />

            <div>
              <RoleHero
                role={user.role}
                nome={user.nome}
                email={user.email}
                experience={experience}
              />
              <RoleSignals role={user.role} experience={experience} />
              <RoleMetrics experience={experience} />
              <RoleWorkspace
                role={user.role}
                accent={experience.accent}
                modules={experience.modules}
              />
              <RoleActions experience={experience} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
