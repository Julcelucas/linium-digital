import { AlertTriangle, Bell, Inbox, User } from "lucide-react";
import { roleLabel, roleSignals } from "./data";
import { RoleDashboard, RoleType } from "./types";

export function RoleSignals({
  role,
  experience,
}: {
  role: RoleType;
  experience: RoleDashboard;
}) {
  const signals = roleSignals[role];

  return (
    <>
      <section className="mt-6 grid md:grid-cols-2 gap-4">
        <article
          className="rounded-2xl border p-5"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} style={{ color: "#F0A500" }} />
            <p className="text-sm font-bold" style={{ color: "#0D1B2A" }}>
              {signals.alertTitle}
            </p>
          </div>
          <p className="text-xs" style={{ color: "#2C3E50" }}>
            {signals.alertText}
          </p>
        </article>

        <article
          className="rounded-2xl border p-5"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Bell size={16} style={{ color: experience.accent }} />
            <p className="text-sm font-bold" style={{ color: "#0D1B2A" }}>
              Estado do dia
            </p>
          </div>
          <p className="text-xs" style={{ color: "#2C3E50" }}>
            Notificacao prioritaria para {roleLabel[role].toLowerCase()}.
          </p>
        </article>
      </section>

      <section
        className="mt-6 rounded-2xl border p-6"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Inbox size={16} style={{ color: experience.accent }} />
          <h3 className="text-base font-bold" style={{ color: "#0D1B2A" }}>
            Estado vazio monitorado
          </h3>
        </div>
        <div
          className="rounded-xl border px-4 py-3 flex items-start gap-3"
          style={{ backgroundColor: "#F4F6F9", borderColor: "#DEE4ED" }}
        >
          <User size={16} style={{ color: "#7F8C8D", marginTop: 2 }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: "#0D1B2A" }}>
              {signals.emptyTitle}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#2C3E50" }}>
              {signals.emptyText}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
