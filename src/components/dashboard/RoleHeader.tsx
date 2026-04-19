import { LogOut } from "lucide-react";
import { roleHeader } from "./data";
import { RoleType } from "./types";

export function RoleHeader({
  role,
  onLogout,
}: {
  role: RoleType;
  onLogout: () => void;
}) {
  const headerStyle = roleHeader[role];

  return (
    <header
      className="px-6 md:px-10 py-5 border-b flex items-center justify-between"
      style={{ background: headerStyle.gradient, borderColor: "#1A3A5C" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#F0A500" }}
        >
          <span className="text-white font-black text-xl">L</span>
        </div>
        <div>
          <p className="text-white font-bold text-lg">linium</p>
          <p className="text-xs" style={{ color: "#B0C4DE" }}>
            {headerStyle.subtitle}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
        style={{ backgroundColor: "#1A3A5C", color: "#FFFFFF" }}
      >
        <LogOut size={16} />
        Sair
      </button>
    </header>
  );
}
