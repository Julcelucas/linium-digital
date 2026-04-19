import { RoleDashboard } from "./types";
import { MetricIcon } from "./icons";

export function RoleMetrics({ experience }: { experience: RoleDashboard }) {
  return (
    <section className="grid md:grid-cols-3 gap-4 mt-6">
      {experience.metrics.map((card) => (
        <article
          key={card.label}
          className="rounded-2xl border p-5"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold" style={{ color: "#7F8C8D" }}>
              {card.label}
            </p>
            <MetricIcon type={card.icon} />
          </div>
          <p className="text-3xl font-black mt-3" style={{ color: "#0D1B2A" }}>
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
}
