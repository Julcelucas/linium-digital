import { notFound } from "next/navigation";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
  User,
  Award,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { MOCK_PROVIDERS } from "@/components/dashboard/providers";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROVIDERS.map((provider) => ({
    id: provider.id,
  }));
}

function StarRating({ value }: { value: number }) {
  const activeStars = Math.round(value);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          style={{
            fill: star <= activeStars ? "#F59E0B" : "none",
            stroke: star <= activeStars ? "#F59E0B" : "#CBD5E1",
          }}
        />
      ))}
    </div>
  );
}

export default async function ProviderProfilePage({ params }: PageProps) {
  const { id } = await params;
  const provider = MOCK_PROVIDERS.find((p) => p.id === id);

  if (!provider) {
    notFound();
  }

  const images = provider.images || [provider.imageUrl];
  const displayImages = images.slice(0, 5); // Máximo 5 imagens

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8FAFC" }}>
      {/* Header com botão de voltar */}
      <div className="sticky top-0 bg-white border-b" style={{ borderColor: "#E2E8F0" }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
            style={{ backgroundColor: "#F1F5F9", color: "#334155" }}
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold text-xl" style={{ color: "#0F172A" }}>
              {provider.name}
            </h1>
            <p className="text-sm" style={{ color: "#64748B" }}>
              {provider.categoryLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Grid de imagens */}
        <section className="mb-8">
          <div
            className="grid gap-4 rounded-2xl overflow-hidden"
            style={{
              gridTemplateColumns:
                displayImages.length === 1
                  ? "1fr"
                  : displayImages.length === 2
                    ? "repeat(2, 1fr)"
                    : displayImages.length === 3
                      ? "repeat(3, 1fr)"
                      : "repeat(2, 1fr)",
              gridTemplateRows:
                displayImages.length === 1
                  ? "300px"
                  : displayImages.length === 2
                    ? "300px"
                    : "auto",
            }}
          >
            {displayImages.map((imageUrl, idx) => (
              <div
                key={idx}
                className="relative"
                style={{
                  gridColumn:
                    displayImages.length === 5 && idx === 0 ? "span 2" : "span 1",
                  gridRow:
                    displayImages.length === 5 && idx === 0 ? "span 2" : "span 1",
                  minHeight: displayImages.length === 1 ? "400px" : "200px",
                }}
              >
                <Image
                  src={imageUrl}
                  alt={`${provider.name} - Imagem ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna esquerda - Informações principais */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seção de avaliação e tipo */}
            <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold" style={{ color: "#0F172A" }}>
                      {provider.name}
                    </h2>
                    {provider.verified && (
                      <BadgeCheck size={24} style={{ color: "#10B981", fill: "#10B981" }} />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {provider.type === "empresa" ? (
                      <Building2 size={16} style={{ color: "#64748B" }} />
                    ) : (
                      <User size={16} style={{ color: "#64748B" }} />
                    )}
                    <span style={{ color: "#64748B", fontSize: "14px" }}>
                      {provider.type === "empresa" ? "Empresa" : "Prestador"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <StarRating value={provider.rating} />
                    <span className="font-semibold" style={{ color: "#0F172A" }}>
                      {provider.rating}
                    </span>
                  </div>
                  <span style={{ color: "#64748B", fontSize: "13px" }}>
                    {provider.reviews} avaliações
                  </span>
                </div>
              </div>
            </div>

            {/* Descrição detalhada */}
            {provider.aboutText && (
              <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#0F172A" }}>
                  Sobre
                </h3>
                <p style={{ color: "#475569", lineHeight: "1.6" }}>
                  {provider.aboutText}
                </p>
              </div>
            )}

            {/* Informações de contato */}
            <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "#0F172A" }}>
                Informações de Contato
              </h3>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${provider.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                >
                  <MessageCircle size={20} style={{ color: "#25D366" }} />
                  <div>
                    <div style={{ fontSize: "13px", color: "#64748B" }}>WhatsApp</div>
                    <div className="font-semibold">{provider.phone}</div>
                  </div>
                </a>

                <a
                  href={`tel:+${provider.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                >
                  <Phone size={20} style={{ color: "#0F172A" }} />
                  <div>
                    <div style={{ fontSize: "13px", color: "#64748B" }}>Telefone</div>
                    <div className="font-semibold">+{provider.phone}</div>
                  </div>
                </a>

                {provider.email && (
                  <a
                    href={`mailto:${provider.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                  >
                    <Mail size={20} style={{ color: "#0F172A" }} />
                    <div>
                      <div style={{ fontSize: "13px", color: "#64748B" }}>Email</div>
                      <div className="font-semibold text-sm break-all">
                        {provider.email}
                      </div>
                    </div>
                  </a>
                )}

                {provider.website && (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: "#F1F5F9", color: "#0F172A" }}
                  >
                    <Globe size={20} style={{ color: "#0F172A" }} />
                    <div>
                      <div style={{ fontSize: "13px", color: "#64748B" }}>Website</div>
                      <div className="font-semibold text-sm break-all">
                        {provider.website}
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Horários de funcionamento */}
            {provider.hours && (
              <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "#0F172A" }}>
                  <Clock size={20} />
                  Horários de Funcionamento
                </h3>
                <p style={{ color: "#475569", whiteSpace: "pre-wrap" }}>
                  {provider.hours}
                </p>
              </div>
            )}

            {/* Tags/Serviços */}
            {provider.tags && provider.tags.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: "#0F172A" }}>
                  Serviços
                </h3>
                <div className="flex flex-wrap gap-2">
                  {provider.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: "#EFF6FF", color: "#0369A1" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna direita - Informações adicionais */}
          <div className="space-y-6">
            {/* Cartão de localização e preço */}
            <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} style={{ color: "#0F172A" }} />
                    <span style={{ color: "#64748B", fontSize: "13px" }}>Localização</span>
                  </div>
                  <p className="font-semibold" style={{ color: "#0F172A" }}>
                    {provider.location}
                  </p>
                </div>

                <div className="border-t" style={{ borderColor: "#E2E8F0" }} />

                <div>
                  <p style={{ color: "#64748B", fontSize: "13px" }} className="mb-2">
                    Tempo de resposta
                  </p>
                  <p className="font-semibold" style={{ color: "#0F172A" }}>
                    {provider.responseTime}
                  </p>
                </div>

                <div className="border-t" style={{ borderColor: "#E2E8F0" }} />

                <div>
                  <p style={{ color: "#64748B", fontSize: "13px" }} className="mb-2">
                    Preço a partir de
                  </p>
                  <p className="font-bold text-lg" style={{ color: "#0F172A" }}>
                    {provider.priceFrom}
                  </p>
                </div>

                <a
                  href={`https://wa.me/${provider.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg font-semibold text-center transition-all block mt-4"
                  style={{ backgroundColor: "#25D366", color: "#FFFFFF" }}
                >
                  Contactar via WhatsApp
                </a>
              </div>
            </div>

            {/* Experiência */}
            {provider.experience && (
              <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} style={{ color: "#0F172A" }} />
                  <h4 className="font-bold" style={{ color: "#0F172A" }}>
                    Experiência
                  </h4>
                </div>
                <p className="font-semibold" style={{ color: "#0F172A" }}>
                  {provider.experience}
                </p>
              </div>
            )}

            {/* Certificações */}
            {provider.certifications && provider.certifications.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#E2E8F0" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Award size={18} style={{ color: "#0F172A" }} />
                  <h4 className="font-bold" style={{ color: "#0F172A" }}>
                    Certificações
                  </h4>
                </div>
                <ul className="space-y-2">
                  {provider.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "#475569" }}
                    >
                      <span className="text-lg leading-none mt-0.5">✓</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
