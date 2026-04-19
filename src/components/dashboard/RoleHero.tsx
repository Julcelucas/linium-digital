import { ChartColumn, UserRound } from "lucide-react";
import { roleLabel } from "./data";
import { RoleDashboard, RoleType } from "./types";

export function RoleHero({
  role,
  nome,
  email,
  experience,
}: {
  role: RoleType;
  nome: string;
  email: string;
  experience: RoleDashboard;
}) {
  return (
    <>
      <section
        className="rounded-2xl border p-6 md:p-8"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm" style={{ color: "#7F8C8D" }}>
              Bem-vindo,
            </p>
            <h1 className="text-3xl font-black" style={{ color: "#0D1B2A" }}>
              {nome}
            </h1>
            <p className="text-sm mt-1" style={{ color: experience.accent }}>
              {roleLabel[role]}
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ backgroundColor: "#F4F6F9" }}
          >
            <UserRound size={16} style={{ color: "#2E6DA4" }} />
            <span className="text-xs" style={{ color: "#2C3E50" }}>
              {email}
            </span>
          </div>
        </div>
      </section>

      <section
        className="mt-6 rounded-2xl border p-6"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ChartColumn size={18} style={{ color: experience.accent }} />
          <h2 className="text-lg font-bold" style={{ color: "#0D1B2A" }}>
            {experience.heading}
          </h2>
        </div>
        <p className="text-sm" style={{ color: "#2C3E50" }}>
          {experience.intro}
        </p>
      </section>
    </>
  );
}
