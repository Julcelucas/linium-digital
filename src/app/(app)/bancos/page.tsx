"use client";

import Image from "next/image";
import { useMemo, useState, useSyncExternalStore, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  Camera,
  CheckCircle2,
  FileSignature,
  Fingerprint,
  IdCard,
  ShieldCheck,
  Upload,
} from "lucide-react";
import {
  getCurrentUser,
  logoutMockUser,
  seedDemoUsers,
  type MockUser,
} from "@/lib/mock-auth";
import { RoleHeader } from "@/components/dashboard/RoleHeader";

const ANGOLA_BANKS = [
  {
    code: "BAI",
    name: "Banco Angolano de Investimentos",
    label: "BAI - Banco Angolano de Investimentos",
    logo: "/banks/official/bai.svg",
  },
  {
    code: "BFA",
    name: "Banco de Fomento Angola",
    label: "BFA - Banco de Fomento Angola",
    logo: "/banks/official/bfa.svg",
  },
  {
    code: "BIC",
    name: "Banco BIC",
    label: "BIC - Banco BIC",
    logo: "/banks/official/bic.svg",
  },
  {
    code: "ATL",
    name: "Banco Atlântico",
    label: "Banco Atlântico",
    logo: "/banks/official/atlantico.png",
  },
  {
    code: "BPC",
    name: "Banco de Poupança e Crédito",
    label: "BPC - Banco de Poupança e Crédito",
    logo: "/banks/official/bpc.png",
  },
];

export default function BancosPage() {
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

  const [selectedBankCode, setSelectedBankCode] = useState(ANGOLA_BANKS[0].code);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [biPdfFileName, setBiPdfFileName] = useState("");
  const [photoFileName, setPhotoFileName] = useState("");
  const [signatureFileName, setSignatureFileName] = useState("");
  const [fingerprintCode, setFingerprintCode] = useState("");
  const [biometricConsent, setBiometricConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [protocol, setProtocol] = useState<string | null>(null);

  const selectedBank = useMemo(
    () => ANGOLA_BANKS.find((bank) => bank.code === selectedBankCode) ?? ANGOLA_BANKS[0],
    [selectedBankCode]
  );

  useEffect(() => {
    seedDemoUsers();

    if (!user) {
      router.replace("/login");
      return;
    }

    const sessionCheck = setInterval(() => {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        logoutMockUser();
        router.replace("/login");
      }
    }, 30000);

    return () => clearInterval(sessionCheck);
  }, [router, user]);

  function handlePdfUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.type !== "application/pdf") {
      setErrorMessage("O Bilhete de Identidade deve ser enviado em PDF.");
      event.target.value = "";
      return;
    }
    setErrorMessage(null);
    setBiPdfFileName(file.name);
  }

  function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    setFileName: (value: string) => void
  ) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Apenas imagens sao aceites para foto e assinatura.");
      event.target.value = "";
      return;
    }

    setErrorMessage(null);
    setFileName(file.name);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!fullName || !birthDate || !identityNumber || !phone || !email || !address) {
      setErrorMessage("Preencha os dados pessoais obrigatorios.");
      return;
    }

    if (!biPdfFileName) {
      setErrorMessage("Anexe o BI em formato PDF para continuar.");
      return;
    }

    if (!photoFileName) {
      setErrorMessage("Retire ou carregue uma foto de rosto.");
      return;
    }

    if (!signatureFileName) {
      setErrorMessage("Carregue uma assinatura para validar o pedido.");
      return;
    }

    if (!biometricConsent || !fingerprintCode) {
      setErrorMessage("Registe os dados biometricos e confirme o consentimento.");
      return;
    }

    if (!termsAccepted) {
      setErrorMessage("Aceite os termos para submeter a abertura de conta.");
      return;
    }

    const generatedProtocol = `AO-${Date.now().toString().slice(-8)}`;
    setProtocol(generatedProtocol);
  }

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F4F6F9" }}
      >
        <p className="text-sm" style={{ color: "#7F8C8D" }}>
          A carregar area bancaria...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F4F6F9" }}>
      <RoleHeader
        role={user.role}
        onLogout={() => {
          logoutMockUser();
          router.replace("/login");
        }}
      />

      <main className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
        <section
          className="rounded-2xl p-6 md:p-8 border"
          style={{
            background:
              "linear-gradient(120deg, rgba(15,23,42,0.96) 15%, rgba(30,64,97,0.92) 100%)",
            borderColor: "#1E3A61",
          }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold tracking-wide" style={{ color: "#93C5FD" }}>
                Area exclusiva para bancos
              </p>
              <h1 className="text-2xl md:text-3xl font-black mt-1" style={{ color: "#FFFFFF" }}>
                Abertura de conta sem filas
              </h1>
              <p className="text-sm mt-3 max-w-2xl" style={{ color: "#CBD5E1" }}>
                Inicie o processo de abertura de conta para bancos angolanos diretamente
                na plataforma Linium, com recolha segura de documentos e biometria.
              </p>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(236,253,245,0.12)", color: "#86EFAC" }}
            >
              <ShieldCheck size={14} />
              KYC digital ativo
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1fr_280px] gap-4 mt-4">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border p-4 md:p-5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <h2 className="text-base font-black mb-4" style={{ color: "#0F172A" }}>
              Dados de abertura de conta
            </h2>

            <div
              className="rounded-xl border p-3 mb-4 flex items-center gap-3"
              style={{ borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" }}
            >
              <Image src={selectedBank.logo} alt={`Logo ${selectedBank.code}`} width={40} height={40} />
              <div>
                <p className="text-xs" style={{ color: "#64748B" }}>
                  Banco selecionado
                </p>
                <p className="text-sm font-black" style={{ color: "#0F172A" }}>
                  {selectedBank.label}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-xs" style={{ color: "#64748B" }}>
                Banco
                <select
                  value={selectedBankCode}
                  onChange={(event) => setSelectedBankCode(event.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A", backgroundColor: "#FFFFFF" }}
                >
                  {ANGOLA_BANKS.map((bank) => (
                    <option key={bank.code} value={bank.code}>
                      {bank.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Nome completo
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Data de nascimento
                <input
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Numero do BI
                <input
                  value={identityNumber}
                  onChange={(event) => setIdentityNumber(event.target.value)}
                  placeholder="Ex: 005874319LA042"
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Telefone
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Ex: 923000111"
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Profissao (opcional)
                <input
                  value={profession}
                  onChange={(event) => setProfession(event.target.value)}
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>

              <label className="text-xs" style={{ color: "#64748B" }}>
                Rendimento mensal (AOA)
                <input
                  value={monthlyIncome}
                  onChange={(event) => setMonthlyIncome(event.target.value)}
                  placeholder="Ex: 250000"
                  className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
              </label>
            </div>

            <label className="text-xs block mt-3" style={{ color: "#64748B" }}>
              Endereco residencial
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                rows={3}
                className="w-full mt-1 px-3 py-2.5 rounded-xl text-sm"
                style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
              />
            </label>

            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <label
                className="rounded-xl border p-3 text-xs"
                style={{ borderColor: "#E2E8F0", color: "#475569", backgroundColor: "#F8FAFC" }}
              >
                <span className="inline-flex items-center gap-1.5 font-semibold mb-2" style={{ color: "#0F172A" }}>
                  <IdCard size={14} />
                  BI em PDF
                </span>
                <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="w-full text-xs" />
                {biPdfFileName && <p className="mt-2 text-[11px]">Arquivo: {biPdfFileName}</p>}
              </label>

              <label
                className="rounded-xl border p-3 text-xs"
                style={{ borderColor: "#E2E8F0", color: "#475569", backgroundColor: "#F8FAFC" }}
              >
                <span className="inline-flex items-center gap-1.5 font-semibold mb-2" style={{ color: "#0F172A" }}>
                  <Camera size={14} />
                  Foto de rosto
                </span>
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(event) => handleImageUpload(event, setPhotoFileName)}
                  className="w-full text-xs"
                />
                {photoFileName && <p className="mt-2 text-[11px]">Imagem: {photoFileName}</p>}
              </label>

              <label
                className="rounded-xl border p-3 text-xs"
                style={{ borderColor: "#E2E8F0", color: "#475569", backgroundColor: "#F8FAFC" }}
              >
                <span className="inline-flex items-center gap-1.5 font-semibold mb-2" style={{ color: "#0F172A" }}>
                  <FileSignature size={14} />
                  Assinatura digital
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, setSignatureFileName)}
                  className="w-full text-xs"
                />
                {signatureFileName && <p className="mt-2 text-[11px]">Assinatura: {signatureFileName}</p>}
              </label>

              <div
                className="rounded-xl border p-3 text-xs"
                style={{ borderColor: "#E2E8F0", color: "#475569", backgroundColor: "#F8FAFC" }}
              >
                <label className="inline-flex items-center gap-1.5 font-semibold mb-2" style={{ color: "#0F172A" }}>
                  <Fingerprint size={14} />
                  Dados biometricos (impressao digital)
                </label>
                <input
                  value={fingerprintCode}
                  onChange={(event) => setFingerprintCode(event.target.value)}
                  placeholder="Codigo de captura / hash da biometria"
                  className="w-full px-3 py-2 rounded-lg text-xs"
                  style={{ border: "1px solid #CBD5E1", color: "#0F172A", backgroundColor: "#FFFFFF" }}
                />
                <label className="flex items-start gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={biometricConsent}
                    onChange={(event) => setBiometricConsent(event.target.checked)}
                    className="mt-0.5"
                  />
                  <span>Autorizo o uso dos meus dados biometricos para validacao KYC.</span>
                </label>
              </div>
            </div>

            <label className="flex items-start gap-2 mt-4 text-xs" style={{ color: "#475569" }}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                className="mt-0.5"
              />
              <span>
                Confirmo que os dados fornecidos sao verdadeiros e aceito os termos de abertura de conta digital.
              </span>
            </label>

            {errorMessage && (
              <p className="mt-3 text-sm font-semibold" style={{ color: "#DC2626" }}>
                {errorMessage}
              </p>
            )}

            {protocol && (
              <div
                className="mt-3 rounded-xl border p-3"
                style={{ borderColor: "#86EFAC", backgroundColor: "#ECFDF3" }}
              >
                <p className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#166534" }}>
                  <CheckCircle2 size={16} />
                  Pedido submetido com sucesso
                </p>
                <p className="text-xs mt-1" style={{ color: "#166534" }}>
                  Protocolo: {protocol}. O banco selecionado vai analisar o pedido e contactar-lhe.
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="submit"
                className="text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
                style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
              >
                Submeter abertura de conta
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl"
                style={{ border: "1px solid #CBD5E1", color: "#334155", backgroundColor: "#FFFFFF" }}
              >
                Voltar ao explore
              </button>
            </div>
          </form>

          <aside className="space-y-3">
            <div
              className="rounded-2xl border p-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <h3 className="text-sm font-black" style={{ color: "#0F172A" }}>
                Bancos angolanos disponiveis
              </h3>
              <ul className="mt-2 space-y-2">
                {ANGOLA_BANKS.map((bank) => (
                  <li
                    key={bank.code}
                    className="text-xs rounded-lg px-3 py-2 border"
                    style={{ borderColor: "#E2E8F0", color: "#334155", backgroundColor: "#F8FAFC" }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Image src={bank.logo} alt={`Logo ${bank.code}`} width={18} height={18} />
                      {bank.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <h3 className="text-sm font-black" style={{ color: "#0F172A" }}>
                Checklist KYC
              </h3>
              <ul className="mt-2 space-y-2 text-xs" style={{ color: "#475569" }}>
                <li className="inline-flex items-center gap-2">
                  <Upload size={13} />
                  Bilhete de identidade em PDF
                </li>
                <li className="inline-flex items-center gap-2">
                  <Camera size={13} />
                  Foto facial atual
                </li>
                <li className="inline-flex items-center gap-2">
                  <FileSignature size={13} />
                  Assinatura digital
                </li>
                <li className="inline-flex items-center gap-2">
                  <Fingerprint size={13} />
                  Impressao digital e consentimento
                </li>
              </ul>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
            >
              <p className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: "#166534" }}>
                <BadgeCheck size={13} />
                Processo relevante para seguranca da plataforma
              </p>
              <p className="text-xs mt-2" style={{ color: "#475569" }}>
                Esta area pode receber futuramente video-selfie, comprovativo de morada,
                declaracao de rendimento e validacao em tempo real com sistemas bancarios.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
