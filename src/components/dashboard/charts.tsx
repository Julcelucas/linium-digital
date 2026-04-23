"use client";

import { useEffect, useState } from "react";
import { Activity, ChartColumn } from "lucide-react";
import { ModuleIcon } from "./icons";
import { RoleDashboard, RoleType } from "./types";

type RangeKey = "hoje" | "7d" | "30d"; 

const rangeOptions: Array<{ key: RangeKey; label: string }> = [
  { key: "hoje", label: "Hoje" },
  { key: "7d", label: "7 dias" },
  { key: "30d", label: "30 dias" },
];

const roleSeries = {
  cidadao: {
    line: {
      hoje: [1, 2, 1, 3, 2, 4, 3],
      "7d": [2, 4, 3, 6, 5, 8, 7],
      "30d": [4, 5, 7, 8, 9, 11, 12],
    },
    timeline: {
      hoje: [
        "09:00 - Pedido de manutencao eletrica criado",
        "11:30 - Orcamento recebido",
        "15:10 - Servico confirmado",
      ],
      "7d": [
        "Seg 09:00 - Eletricista",
        "Ter 14:30 - Canalizacao",
        "Qui 10:15 - Limpeza",
      ],
      "30d": [
        "Semana 1 - 4 pedidos concluidos",
        "Semana 2 - 2 comparacoes de orcamento",
        "Semana 3 - 3 avaliacoes submetidas",
      ],
    },
  },
  prestador: {
    bar: {
      hoje: [18, 22, 15, 28, 24, 31, 27],
      "7d": [25, 40, 35, 60, 52, 70, 66],
      "30d": [35, 48, 60, 72, 69, 80, 92],
    },
    pipeline: {
      hoje: [
        ["Novos", 4],
        ["Em conversa", 3],
        ["Proposta enviada", 2],
        ["Fechados", 1],
      ] as Array<[string, number]>,
      "7d": [
        ["Novos", 8],
        ["Em conversa", 6],
        ["Proposta enviada", 3],
        ["Fechados", 2],
      ] as Array<[string, number]>,
      "30d": [
        ["Novos", 21],
        ["Em conversa", 14],
        ["Proposta enviada", 8],
        ["Fechados", 5],
      ] as Array<[string, number]>,
    },
  },
  empresa: {
    donut: {
      hoje: 94,
      "7d": 96,
      "30d": 93,
    },
    table: {
      hoje: [
        ["Comercial", "20", "18"],
        ["Operacoes", "16", "15"],
        ["Suporte", "18", "17"],
      ] as Array<[string, string, string]>,
      "7d": [
        ["Comercial", "100", "87"],
        ["Operacoes", "80", "76"],
        ["Suporte", "95", "92"],
      ] as Array<[string, string, string]>,
      "30d": [
        ["Comercial", "420", "392"],
        ["Operacoes", "360", "345"],
        ["Suporte", "390", "381"],
      ] as Array<[string, string, string]>,
    },
  },
} as const;

function RangeSwitcher({
  value,
  onChange,
  accent,
}: {
  value: RangeKey;
  onChange: (value: RangeKey) => void;
  accent: string;
}) {
  return (
    <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: "#F4F6F9" }}>
      {rangeOptions.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className="text-[11px] px-2.5 py-1 rounded-md transition-all duration-300"
            style={{
              backgroundColor: active ? accent : "transparent",
              color: active ? "#FFFFFF" : "#2C3E50",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function MockLineChart({
  values,
  color,
}: {
  values: readonly number[];
  color: string;
}) {
  const width = 280;
  const height = 84;
  const max = Math.max(...values, 1);
  const step = width / Math.max(values.length - 1, 1);

  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / max) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MockDonut({ value, color }: { value: number; color: string }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="#DEE4ED" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-sm font-black"
        style={{ color: "#0D1B2A" }}
      >
        {value}%
      </div>
    </div>
  );
}

function MissionControlCard({ accent, range }: { accent: string; range: RangeKey }) {
  const [pulse, setPulse] = useState(() => ({
    risk: "baixo",
    conversion: 12,
    saturation: "normal",
    latency: 120,
    updatedAt: new Date(),
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      const riskSeed = Math.random();
      const saturationSeed = Math.random();

      setPulse({
        risk: riskSeed < 0.65 ? "baixo" : riskSeed < 0.9 ? "medio" : "alto",
        conversion: 8 + Math.floor(Math.random() * 18),
        saturation:
          saturationSeed < 0.5 ? "normal" : saturationSeed < 0.85 ? "atencao" : "critica",
        latency: 85 + Math.floor(Math.random() * 90),
        updatedAt: new Date(),
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [range]);

  const [spark] = useState<number[]>(() =>
    Array.from({ length: 18 }, () => 10 + Math.floor(Math.random() * 70))
  );

  return (
    <article
      className="mt-6 rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(13,27,42,0.08)]"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity size={15} style={{ color: accent }} />
          <p className="text-sm font-bold" style={{ color: "#0D1B2A" }}>
            Mission Control
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          <span className="text-[10px] px-2 py-1 rounded-full" style={{ backgroundColor: "#F4F6F9", color: accent }}>
            Live Pulse
          </span>
        </div>
      </div>

      <div
        className="h-24 rounded-xl p-2 flex items-end gap-1"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(46,109,164,0.22), transparent 40%), radial-gradient(circle at 80% 50%, rgba(240,165,0,0.18), transparent 45%), #F4F6F9",
        }}
      >
        {spark.map((point, index) => (
          <div
            key={`${point}-${index}`}
            className="flex-1 rounded-sm transition-all duration-500"
            style={{
              height: `${point}%`,
              backgroundColor: accent,
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-2 mt-3">
        {[
          `Risco operacional: ${pulse.risk}`,
          `Conversao estimada: +${pulse.conversion}%`,
          `Saturacao da fila: ${pulse.saturation}`,
        ].map((item) => (
          <div
            key={item}
            className="text-[11px] rounded-lg px-2 py-1.5 transition-colors duration-300"
            style={{ backgroundColor: "#F4F6F9", color: "#2C3E50" }}
          >
            {item}
          </div>
        ))}
      </div>

      <p className="text-[10px] mt-2" style={{ color: "#7F8C8D" }}>
        Atualizado as {pulse.updatedAt.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} · latencia {pulse.latency}ms
      </p>
    </article>
  );
}

export function RoleWorkspace({
  role,
  accent,
  modules,
}: {
  role: RoleType;
  accent: string;
  modules: RoleDashboard["modules"];
}) {
  const [range, setRange] = useState<RangeKey>("7d");

  if (role === "cidadao") {
    const values = roleSeries.cidadao.line[range];
    const timeline = roleSeries.cidadao.timeline[range];

    return (
      <>
        <section className="grid lg:grid-cols-[1.25fr_0.75fr] gap-4 mt-6">
          <article
            className="rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
          >
            <div className="flex items-center justify-between mb-2 gap-3">
              <p className="text-sm font-bold" style={{ color: "#0D1B2A" }}>
                Evolucao de pedidos
              </p>
              <div className="flex items-center gap-2">
                <RangeSwitcher value={range} onChange={setRange} accent={accent} />
                <ChartColumn size={16} style={{ color: accent }} />
              </div>
            </div>
            <div key={range} className="transition-opacity duration-500">
              <MockLineChart values={values} color={accent} />
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              {modules.map((module) => (
                <div
                  key={module.title}
                  className="rounded-xl p-3 transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#F4F6F9" }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold" style={{ color: "#0D1B2A" }}>
                      {module.title}
                    </p>
                    <ModuleIcon type={module.icon} color={accent} />
                  </div>
                  <p className="text-[11px]" style={{ color: "#2C3E50" }}>
                    {module.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article
            className="rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
          >
            <p className="text-sm font-bold mb-3" style={{ color: "#0D1B2A" }}>
              Agenda dinamica
            </p>
            <ul className="space-y-2">
              {timeline.map((item) => (
                <li key={item} className="text-xs rounded-lg px-3 py-2" style={{ backgroundColor: "#F4F6F9", color: "#2C3E50" }}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>
        <MissionControlCard accent={accent} range={range} />
      </>
    );
  }

  if (role === "prestador") {
    const simpleQueue = [
      { cliente: "Maria Lopes", servico: "Reparacao eletrica", horario: "09:30", valor: "AOA 18.000" },
      { cliente: "Andre Silva", servico: "Montagem de tomadas", horario: "11:00", valor: "AOA 12.000" },
      { cliente: "Dona Helena", servico: "Manutencao geral", horario: "14:15", valor: "AOA 22.000" },
    ];

    const todaySteps = [
      "Responder pedidos pendentes",
      "Confirmar horarios de hoje",
      "Atualizar disponibilidade de amanha",
      "Registar servicos concluidos",
    ];

    return (
      <>
        <section className="grid lg:grid-cols-2 gap-4 mt-6">
          <article
            className="rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
          >
            <p className="text-sm font-bold mb-3" style={{ color: "#0D1B2A" }}>
              O que fazer agora
            </p>
            <ul className="space-y-2">
              {todaySteps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-lg px-3 py-2 text-xs flex items-center justify-between"
                  style={{ backgroundColor: "#F4F6F9", color: "#2C3E50" }}
                >
                  <span>{step}</span>
                  <span
                    className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: "#EAF8EF", color: accent }}
                  >
                    {index + 1}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className="rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
          >
            <p className="text-sm font-bold mb-3" style={{ color: "#0D1B2A" }}>
              Pedidos de hoje
            </p>
            <div className="space-y-2">
              {simpleQueue.map((item) => (
                <div
                  key={item.cliente}
                  className="rounded-lg px-3 py-2"
                  style={{ backgroundColor: "#F4F6F9" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-bold" style={{ color: "#0D1B2A" }}>
                      {item.cliente}
                    </p>
                    <span className="text-[10px]" style={{ color: "#7F8C8D" }}>
                      {item.horario}
                    </span>
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: "#2C3E50" }}>
                    {item.servico}
                  </p>
                  <p className="text-[11px] font-bold mt-0.5" style={{ color: accent }}>
                    {item.valor}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid sm:grid-cols-3 gap-3 mt-4">
          {modules.map((module) => (
            <article
              key={module.title}
              className="rounded-xl border p-3 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold" style={{ color: "#0D1B2A" }}>
                  {module.title}
                </p>
                <ModuleIcon type={module.icon} color={accent} />
              </div>
              <p className="text-[11px]" style={{ color: "#2C3E50" }}>
                {module.detail}
              </p>
            </article>
          ))}
        </section>
      </>
    );
  }

  const tableRows = roleSeries.empresa.table[range];
  const donutValue = roleSeries.empresa.donut[range];

  return (
    <>
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 mt-6">
        <article
          className="rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
        >
          <div className="flex items-center justify-between mb-3 gap-3">
            <p className="text-sm font-bold" style={{ color: "#0D1B2A" }}>
              Visao executiva da operacao
            </p>
            <div className="flex items-center gap-2">
              <RangeSwitcher value={range} onChange={setRange} accent={accent} />
              <ChartColumn size={16} style={{ color: accent }} />
            </div>
          </div>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: "#7F8C8D" }}>
                  <th className="text-left pb-2">Area</th>
                  <th className="text-left pb-2">Meta</th>
                  <th className="text-left pb-2">Atual</th>
                </tr>
              </thead>
              <tbody style={{ color: "#2C3E50" }}>
                {tableRows.map(([area, target, current]) => (
                  <tr key={area} className="border-t" style={{ borderColor: "#DEE4ED" }}>
                    <td className="py-2">{area}</td>
                    <td className="py-2">{target}</td>
                    <td className="py-2">{current}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article
          className="rounded-2xl border p-5 transition-all duration-500 hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)]"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#DEE4ED" }}
        >
          <p className="text-sm font-bold mb-2" style={{ color: "#0D1B2A" }}>
            SLA global
          </p>
          <div key={range} className="transition-opacity duration-500">
            <MockDonut value={donutValue} color={accent} />
          </div>
          <div className="grid gap-2 mt-4">
            {modules.map((module) => (
              <div
                key={module.title}
                className="rounded-lg p-2.5 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#F4F6F9" }}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold" style={{ color: "#0D1B2A" }}>
                    {module.title}
                  </p>
                  <ModuleIcon type={module.icon} color={accent} />
                </div>
                <p className="text-[11px]" style={{ color: "#2C3E50" }}>
                  {module.detail}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
      <MissionControlCard accent={accent} range={range} />
    </>
  );
}
