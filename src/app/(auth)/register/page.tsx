"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  User,
  Wrench,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { registerMockUser, seedDemoUsers, type UserRole } from "@/lib/mock-auth";

/* ── Zod schema ── */
const schema = z
  .object({
    nome: z.string().min(3, "Nome demasiado curto"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(9, "Número inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string(),
    categoria: z.string().optional(),
    provincia: z.string().optional(),
    nomeEmpresa: z.string().optional(),
    nif: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As palavras-passe não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

/* ── Profile types ── */
type ProfileType = "cidadao" | "prestador" | "empresa";

const profiles = [
  {
    id: "cidadao" as ProfileType,
    Icon: User,
    title: "Cidadão / Cliente",
    description: "Pesquisa e contrata serviços de forma rápida e segura.",
  },
  {
    id: "prestador" as ProfileType,
    Icon: Wrench,
    title: "Prestador Informal",
    description: "Divulga os teus serviços e ganha visibilidade digital.",
  },
  {
    id: "empresa" as ProfileType,
    Icon: Building2,
    title: "Empresa Formal",
    description: "Perfil completo para empresas registadas com NIF.",
  },
];

const categorias = [
  "Serviços Básicos",
  "Serviços Especializados",
  "Logística e Entregas",
  "Educação e Formação",
  "Saúde e Bem-estar",
  "Serviços Domésticos",
  "Tecnologia e Informática",
  "Serviços Comunitários",
];

const provincias = [
  "Luanda",
  "Benguela",
  "Huambo",
  "Malanje",
  "Cabinda",
  "Huíla",
  "Uíge",
  "Kuanza Sul",
  "Moxico",
  "Zaire",
  "Outras",
];

/* ── Input helper ── */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-semibold mb-1.5"
        style={{ color: "#2C3E50" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-1" style={{ color: "#e74c3c" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  hasError,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-colors"
      style={{ borderColor: hasError ? "#e74c3c" : "#DEE4ED", color: "#2C3E50" }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#2E6DA4")}
      onBlur={(e) =>
        (e.currentTarget.style.borderColor = hasError ? "#e74c3c" : "#DEE4ED")
      }
    />
  );
}

function SelectInput({
  hasError,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { hasError?: boolean }) {
  return (
    <select
      {...props}
      className="w-full px-4 py-3 rounded-xl border bg-white text-sm outline-none transition-colors appearance-none cursor-pointer"
      style={{ borderColor: hasError ? "#e74c3c" : "#DEE4ED", color: "#2C3E50" }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#2E6DA4")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#DEE4ED")}
    >
      {children}
    </select>
  );
}

/* ── Page ── */
export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [profileType, setProfileType] = useState<ProfileType | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdLogin, setCreatedLogin] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!profileType) {
      setSubmitError("Seleciona um perfil para continuar.");
      return;
    }

    setSubmitError(null);
    seedDemoUsers();
    await new Promise((r) => setTimeout(r, 1200));

    try {
      registerMockUser({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        password: data.password,
        role: profileType as UserRole,
        categoria: data.categoria,
        provincia: data.provincia,
        nomeEmpresa: data.nomeEmpresa,
        nif: data.nif,
      });

      setCreatedLogin({ email: data.email, password: data.password });
      setStep(3);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      setSubmitError(message);
    }
  };

  return (
    <div className="min-h-screen flex select-none">
      {/* ── LEFT BRAND PANEL ── */}
      <aside
        className="hidden lg:flex w-[58%] flex-col justify-between p-14 relative overflow-hidden"
        style={{ backgroundColor: "#0D1B2A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 40% 70%, rgba(46,109,164,0.2) 0%, transparent 70%)",
          }}
        />
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
            className="w-10 h-10 rounded-xl flex items-center justify-center"
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

        {/* Copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-5"
              style={{ color: "#F0A500" }}
            >
              Junta-te à plataforma
            </p>
            <h1 className="text-[3.2rem] font-black text-white leading-[1.1] mb-5">
              O teu negócio
              <br />
              merece ser
              <br />
              <span style={{ color: "#4A9FD4" }}>encontrado.</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "#B0C4DE" }}>
              Cria o teu perfil em minutos e começa
              <br />a receber clientes ainda hoje.
            </p>
          </div>

          {/* How it works */}
          <div className="space-y-4">
            {[
              {
                n: "01",
                title: "Cria o teu perfil",
                desc: "Preenche os teus dados em poucos passos.",
              },
              {
                n: "02",
                title: "Validação Linium",
                desc: "A nossa equipa verifica e certifica o teu perfil.",
              },
              {
                n: "03",
                title: "Recebe clientes",
                desc: "Apareças nas pesquisas e recebe contactos directos.",
              },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-black text-xs"
                  style={{
                    backgroundColor: "rgba(240,165,0,0.15)",
                    color: "#F0A500",
                  }}
                >
                  {s.n}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{s.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#B0C4DE" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium"
            style={{
              borderColor: "rgba(74,159,212,0.3)",
              color: "#B0C4DE",
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#27AE60" }}
            />
            Gratuito para prestadores — fase piloto Luanda
          </div>
        </div>
      </aside>

      {/* ── RIGHT PANEL ── */}
      <main
        className="flex-1 flex items-center justify-center p-8"
        style={{ backgroundColor: "#F4F6F9" }}
      >
          <div className="w-full max-w-110">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
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

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center gap-2 mb-8">
              {([1, 2] as const).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      backgroundColor: step >= s ? "#F0A500" : "#DEE4ED",
                      color: step >= s ? "#0D1B2A" : "#B0C4DE",
                    }}
                  >
                    {step > s ? <CheckCircle2 size={14} /> : s}
                  </div>
                  {s < 2 && (
                    <div
                      className="w-14 h-0.5 rounded-full transition-all"
                      style={{
                        backgroundColor: step > s ? "#F0A500" : "#DEE4ED",
                      }}
                    />
                  )}
                </div>
              ))}
              <span
                className="ml-2 text-xs font-medium"
                style={{ color: "#B0C4DE" }}
              >
                Passo {step} de 2
              </span>
            </div>
          )}

          {/* ── STEP 1: Profile selector ── */}
          {step === 1 && (
            <div>
              <h2
                className="text-3xl font-black mb-1"
                style={{ color: "#0D1B2A" }}
              >
                Criar conta
              </h2>
              <p className="text-sm mb-6" style={{ color: "#7F8C8D" }}>
                Escolhe o tipo de conta que melhor te descreve.
              </p>

              <div className="space-y-3">
                {profiles.map(({ id, Icon, title, description }) => {
                  const selected = profileType === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setProfileType(id)}
                      className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all"
                      style={{
                        backgroundColor: selected
                          ? "rgba(240,165,0,0.05)"
                          : "white",
                        borderColor: selected ? "#F0A500" : "#DEE4ED",
                        boxShadow: selected
                          ? "0 0 0 1px #F0A500"
                          : "none",
                      }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all"
                        style={{
                          backgroundColor: selected ? "#F0A500" : "#F4F6F9",
                          color: selected ? "#0D1B2A" : "#7F8C8D",
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-bold text-sm"
                          style={{ color: "#0D1B2A" }}
                        >
                          {title}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#7F8C8D" }}
                        >
                          {description}
                        </p>
                      </div>
                      {/* Radio dot */}
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor: selected ? "#F0A500" : "#DEE4ED",
                          backgroundColor: selected ? "#F0A500" : "transparent",
                        }}
                      >
                        {selected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={!profileType}
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#F0A500", color: "#0D1B2A" }}
              >
                Continuar <ArrowRight size={17} />
              </button>

              <p
                className="text-center mt-6 text-sm"
                style={{ color: "#7F8C8D" }}
              >
                Já tens conta?{" "}
                <Link
                  href="/login"
                  className="font-semibold hover:underline"
                  style={{ color: "#2E6DA4" }}
                >
                  Entrar
                </Link>
              </p>
            </div>
          )}

          {/* ── STEP 2: Form ── */}
          {step === 2 && (
            <div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-sm font-medium mb-6 transition-opacity hover:opacity-70"
                style={{ color: "#2E6DA4" }}
              >
                <ArrowLeft size={15} /> Voltar
              </button>

              <h2
                className="text-3xl font-black mb-1"
                style={{ color: "#0D1B2A" }}
              >
                Os teus dados
              </h2>
              <p className="text-sm mb-6" style={{ color: "#7F8C8D" }}>
                Perfil:{" "}
                <span className="font-semibold" style={{ color: "#F0A500" }}>
                  {profiles.find((p) => p.id === profileType)?.title}
                </span>
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-4"
              >
                {/* Empresa Formal extra fields */}
                {profileType === "empresa" && (
                  <>
                    <Field
                      label="Nome da Empresa"
                      error={errors.nomeEmpresa?.message}
                    >
                      <TextInput
                        {...register("nomeEmpresa")}
                        hasError={!!errors.nomeEmpresa}
                        type="text"
                        placeholder="Ex: TechAngola Lda."
                      />
                    </Field>
                    <Field label="NIF" error={errors.nif?.message}>
                      <TextInput
                        {...register("nif")}
                        hasError={!!errors.nif}
                        type="text"
                        placeholder="Ex: 5000123456"
                      />
                    </Field>
                  </>
                )}

                {/* Nome */}
                <Field
                  label={
                    profileType === "empresa"
                      ? "Nome do Responsável"
                      : "Nome Completo"
                  }
                  error={errors.nome?.message}
                >
                  <TextInput
                    {...register("nome")}
                    hasError={!!errors.nome}
                    type="text"
                    placeholder="Ex: João Bastos"
                  />
                </Field>

                {/* Email + Telefone */}
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email" error={errors.email?.message}>
                    <TextInput
                      {...register("email")}
                      hasError={!!errors.email}
                      type="email"
                      autoComplete="email"
                      placeholder="email@exemplo.com"
                    />
                  </Field>
                  <Field label="Telefone" error={errors.telefone?.message}>
                    <TextInput
                      {...register("telefone")}
                      hasError={!!errors.telefone}
                      type="tel"
                      placeholder="+244 9xx xxx xxx"
                    />
                  </Field>
                </div>

                {/* Categoria + Província (prestador + empresa only) */}
                {(profileType === "prestador" || profileType === "empresa") && (
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Categoria" error={errors.categoria?.message}>
                      <SelectInput
                        {...register("categoria")}
                        hasError={!!errors.categoria}
                      >
                        <option value="">Selecionar...</option>
                        {categorias.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                    <Field label="Província" error={errors.provincia?.message}>
                      <SelectInput
                        {...register("provincia")}
                        hasError={!!errors.provincia}
                      >
                        <option value="">Selecionar...</option>
                        {provincias.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                  </div>
                )}

                {/* Password */}
                <Field
                  label="Palavra-passe"
                  error={errors.password?.message}
                >
                  <div className="relative">
                    <TextInput
                      {...register("password")}
                      hasError={!!errors.password}
                      type={showPass ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 pr-12 rounded-xl border bg-white text-sm outline-none transition-colors"
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
                </Field>

                {/* Confirm Password */}
                <Field
                  label="Confirmar Palavra-passe"
                  error={errors.confirmPassword?.message}
                >
                  <div className="relative">
                    <TextInput
                      {...register("confirmPassword")}
                      hasError={!!errors.confirmPassword}
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Repete a palavra-passe"
                      className="w-full px-4 py-3 pr-12 rounded-xl border bg-white text-sm outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-opacity hover:opacity-70"
                      style={{ color: "#7F8C8D" }}
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </Field>

                {/* Submit */}
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
                      A criar conta...
                    </span>
                  ) : (
                    <>
                      Criar Conta <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {submitError && (
                  <p className="text-xs text-center" style={{ color: "#e74c3c" }}>
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === 3 && (
            <div className="text-center py-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: "rgba(39,174,96,0.1)" }}
              >
                <CheckCircle2 size={40} style={{ color: "#27AE60" }} />
              </div>

              <h2
                className="text-3xl font-black mb-2"
                style={{ color: "#0D1B2A" }}
              >
                Conta criada!
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#7F8C8D" }}
              >
                O teu pedido foi submetido com sucesso.
              </p>

              {createdLogin && (
                <div
                  className="mt-4 mb-2 p-3 rounded-xl border text-left"
                  style={{
                    borderColor: "#DEE4ED",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <p
                    className="text-xs font-bold mb-1"
                    style={{ color: "#2E6DA4" }}
                  >
                    Credenciais criadas
                  </p>
                  <p className="text-xs" style={{ color: "#2C3E50" }}>
                    Email: {createdLogin.email}
                  </p>
                  <p className="text-xs" style={{ color: "#2C3E50" }}>
                    Palavra-passe: {createdLogin.password}
                  </p>
                </div>
              )}

              {(profileType === "prestador" || profileType === "empresa") && (
                <div
                  className="mt-5 mb-8 p-4 rounded-xl border text-left"
                  style={{
                    backgroundColor: "rgba(240,165,0,0.05)",
                    borderColor: "rgba(240,165,0,0.25)",
                  }}
                >
                  <p
                    className="text-xs font-bold mb-1"
                    style={{ color: "#F0A500" }}
                  >
                    Próximo passo
                  </p>
                  <p className="text-sm" style={{ color: "#2C3E50" }}>
                    A equipa Linium irá validar e certificar o teu perfil em
                    breve. Receberás uma notificação por email.
                  </p>
                </div>
              )}

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: "#F0A500", color: "#0D1B2A" }}
              >
                Ir para o Login <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
