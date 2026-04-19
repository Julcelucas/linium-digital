import { roleSidebar } from "./data";
import { RoleDashboard, RoleType } from "./types";

export function RoleSidebar({
  role,
  experience,
}: {
  role: RoleType;
  experience: RoleDashboard;
}) {
  if (role === "cidadao") {
    return null;
  }

  const items = roleSidebar[role];

  return (
    <aside
      className="rounded-2xl border p-4 h-fit"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
    >
      <p className="text-xs font-bold mb-3" style={{ color: "#7F8C8D" }}>
        Navegacao
      </p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.label}
            className="rounded-xl px-3 py-2 flex items-center gap-2"
            style={{
              backgroundColor: index === 0 ? "#F4F6F9" : "transparent",
              color: index === 0 ? "#0D1B2A" : "#2C3E50",
            }}
          >
            <item.icon size={15} style={{ color: experience.accent }} />
            <span className="text-xs font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
