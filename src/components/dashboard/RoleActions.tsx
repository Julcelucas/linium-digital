import { RoleDashboard } from "./types";

export function RoleActions({ experience }: { experience: RoleDashboard }) {
  return (
    <section
      className="mt-6 rounded-2xl border p-6"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
    >
      <h3 className="text-base font-bold mb-3" style={{ color: "#0D1B2A" }}>
        Acoes prioritarias
      </h3>
      <ul className="space-y-2">
        {experience.quickActions.map((action) => (
          <li
            key={action}
            className="text-sm rounded-xl px-3 py-2"
            style={{ backgroundColor: "#F4F6F9", color: "#2C3E50" }}
          >
            {action}
          </li>
        ))}
      </ul>
    </section>
  );
}
