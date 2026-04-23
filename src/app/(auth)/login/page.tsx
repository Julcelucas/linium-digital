"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getDemoCredentials,
  loginMockUser,
  seedDemoUsers,
} from "@/lib/mock-auth";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

const features = [
  "Mais de 2.400 prestadores verificados",
  "Conexão directa via WhatsApp",
  "Avaliações reais de outros clientes",
  "Disponível em Luanda e a expandir",
];

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const demoCredentials = getDemoCredentials();

  useEffect(() => {
    seedDemoUsers();

    const currentUser = getCurrentUser();
    if (currentUser) {
      router.replace("/dashboard");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 1000));

    try {
      loginMockUser(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao autenticar.";
      setAuthError(message);
    }
  };

  return (
    <div className="min-h-screen flex select-none">
      {/* ── LEFT BRAND PANEL ── */}
      <aside
        className="hidden lg:flex w-[58%] flex-col justify-between p-14 relative overflow-hidden"
        style={{ backgroundColor: "#0D1B2A" }}
      >
        {/* Radial gradient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(46,109,164,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Diagonal stripe pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage:
              "repeating-linear-gradient(-45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 40px)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#F0A500" }}
          >
            <span className="text-white font-black text-xl leading-none">
              L
            </span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            linium
          </span>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-7">
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#F0A500" }}
            >
              Ecossistema Digital · Angola
            </p>
            <h1 className="text-[3.2rem] font-black text-white leading-[1.1] mb-5">
              O mercado de
              <br />
              serviços angolano,
              <br />
              <span style={{ color: "#4A9FD4" }}>digitalizado.</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#B0C4DE" }}>
              Conectamos cidadãos e clientes a prestadores validados,
              <br />
              de canalizadores a consultores jurídicos.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle2
                  size={18}
                  style={{ color: "#27AE60" }}
                  className="shrink-0"
                />
                <span className="text-sm" style={{ color: "#B0C4DE" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats card */}
        <div className="relative z-10">
          <div
            className="rounded-2xl p-6 grid grid-cols-3 gap-4 border"
            style={{
              backgroundColor: "rgba(26,58,92,0.45)",
              borderColor: "rgba(74,159,212,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            {[
              { value: "2.4k+", label: "Prestadores" },
              { value: "18", label: "Categorias" },
              { value: "3", label: "Províncias" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "#B0C4DE" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ── RIGHT FORM PANEL ── */}
      <main
        className="flex-1 flex items-center justify-center p-8"
        style={{ backgroundColor: "#F4F6F9" }}
      >
        <div className="w-full max-w-95">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#F0A500" }}
            >
              <span className="text-white font-black text-base leading-none">
                L
              </span>
            </div>
            <span
              className="font-bold text-xl tracking-tight"
              style={{ color: "#0D1B2A" }}
            >
              linium
            </span>
          </div>

          <h2
            className="text-3xl font-black mb-1"
            style={{ color: "#0D1B2A" }}
          >
            Bem-vindo de volta
          </h2>
          <p className="text-sm mb-8" style={{ color: "#7F8C8D" }}>
            Entra na tua conta para continuar.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "#2C3E50" }}
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder="o.teu@email.com"
                className="w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-colors"
                style={{
                  borderColor: errors.email ? "#e74c3c" : "#DEE4ED",
                  color: "#2C3E50",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "#2E6DA4")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = errors.email
                    ? "#e74c3c"
                    : "#DEE4ED")
                }
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "#e74c3c" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label
                  className="text-sm font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  Palavra-passe
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: "#2E6DA4" }}
                >
                  Esqueceste?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border bg-white text-sm outline-none transition-colors"
                  style={{
                    borderColor: errors.password ? "#e74c3c" : "#DEE4ED",
                    color: "#2C3E50",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "#2E6DA4")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = errors.password
                      ? "#e74c3c"
                      : "#DEE4ED")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-opacity hover:opacity-70"
                  style={{ color: "#7F8C8D" }}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: "#e74c3c" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              style={{ backgroundColor: "#F0A500", color: "#0D1B2A" }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  A entrar...
                </span>
              ) : (
                <>
                  Entrar <ArrowRight size={17} />
                </>
              )}
            </button>

            {authError && (
              <p className="text-xs text-center" style={{ color: "#e74c3c" }}>
                {authError}
              </p>
            )}
          </form>

          <div
            className="mt-5 rounded-xl border p-4"
            style={{
              borderColor: "#DEE4ED",
              backgroundColor: "#FFFFFF",
            }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: "#2E6DA4" }}>
              Dados de teste
            </p>
            <div className="space-y-2">
              {demoCredentials.map((credential) => (
                <p
                  key={credential.email}
                  className="text-xs"
                  style={{ color: "#2C3E50" }}
                >
                  {credential.role}: {credential.email} / {credential.password}
                </p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#DEE4ED" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "#B0C4DE" }}
            >
              Novo no Linium?
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#DEE4ED" }}
            />
          </div>

          <Link
            href="/register"
            className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center border transition-all hover:border-[#2E6DA4]"
            style={{
              borderColor: "#DEE4ED",
              color: "#2E6DA4",
              backgroundColor: "white",
            }}
          >
            Criar uma conta
          </Link>
        </div>
      </main>
    </div>
  );
}
