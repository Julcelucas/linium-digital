"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType, type CSSProperties } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Clock3,
  GraduationCap,
  Heart,
  Hotel,
  Landmark,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Phone,
  Pill,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  User,
  UtensilsCrossed,
  Waves,
  X,
  Zap,
  Laptop,
} from "lucide-react";
import { MOCK_PROVIDERS, type Provider } from "./providers";

type CategoryKey =
  | "all"
  | "tecnologia"
  | "restaurantes"
  | "farmacias"
  | "eletricidade"
  | "escolas"
  | "bancos"
  | "hoteis"
  | "lazer"
  | "outros";

type PriceTier = "all" | "economico" | "medio" | "premium";
type SortKey =
  | "relevancia"
  | "avaliacao"
  | "mais-avaliados"
  | "menor-preco"
  | "maior-preco";

type CategoryDef = {
  key: CategoryKey;
  label: string;
  Icon: ComponentType<{ size?: number; style?: CSSProperties }>;
};

const CATEGORIES: CategoryDef[] = [
  { key: "all", label: "Todos", Icon: LayoutGrid },
  { key: "tecnologia", label: "Tecnologia", Icon: Laptop },
  { key: "restaurantes", label: "Restaurantes", Icon: UtensilsCrossed },
  { key: "farmacias", label: "Farmácias", Icon: Pill },
  { key: "eletricidade", label: "Eletricidade", Icon: Zap },
  { key: "escolas", label: "Escolas", Icon: GraduationCap },
  { key: "bancos", label: "Bancos", Icon: Landmark },
  { key: "hoteis", label: "Hotéis", Icon: Hotel },
  { key: "lazer", label: "Piscinas & Lazer", Icon: Waves },
  { key: "outros", label: "Outros", Icon: Sparkles },
];

const ANGOLA_BANKS = [
  {
    name: "BAI",
    fullName: "Banco Angolano de Investimentos",
    logo: "/banks/official/bai.svg",
  },
  {
    name: "BFA",
    fullName: "Banco de Fomento Angola",
    logo: "/banks/official/bfa.svg",
  },
  {
    name: "BIC",
    fullName: "Banco BIC",
    logo: "/banks/official/bic.svg",
  },
  {
    name: "Atlântico",
    fullName: "Banco Atlântico",
    logo: "/banks/official/atlantico.png",
  },
  {
    name: "BPC",
    fullName: "Banco de Poupança e Crédito",
    logo: "/banks/official/bpc.png",
  },
];

const HERO_SLIDES = [
  {
    title: "Encontre serviços e negócios|ideais para o seu dia a dia",
    description:
      "Explore computadores, restaurantes, farmácias, bancos, escolas, hotéis, piscinas e muito mais em um só ambiente.",
    backgroundImage:
      "linear-gradient(110deg, rgba(2,6,23,0.86) 15%, rgba(2,6,23,0.56) 48%, rgba(2,6,23,0.42) 100%), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80')",
    ctaLabel: "Explorar agora",
    ctaHref: "#explore-results",
  },
  {
    title: "Evite filas no banco|abra a sua conta online",
    description:
      "Podes fazer a abertura de conta na nossa plataforma com BI em PDF, foto, assinatura e biometria em poucos passos.",
    backgroundImage:
      "linear-gradient(112deg, rgba(2,6,23,0.87) 12%, rgba(15,23,42,0.56) 45%, rgba(30,64,97,0.35) 100%), url('/hero/medium-shot-woman-with-afro-hairstyle.jpg')",
    ctaLabel: "Abrir conta na plataforma",
    ctaHref: "/bancos",
  },
] as const;

const EXPLORE_PAGE_SIZE = 10;

function parseAoaPrice(value: string): number | null {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) {
    return null;
  }
  return Number(digits);
}

function matchesPriceTier(price: number | null, tier: PriceTier): boolean {
  if (tier === "all") {
    return true;
  }
  if (price === null) {
    return false;
  }
  if (tier === "economico") {
    return price <= 10000;
  }
  if (tier === "medio") {
    return price > 10000 && price <= 30000;
  }
  return price > 30000;
}

function StarRating({ value }: { value: number }) {
  const activeStars = Math.round(value);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          style={{
            fill: star <= activeStars ? "#F59E0B" : "none",
            stroke: star <= activeStars ? "#F59E0B" : "#CBD5E1",
          }}
        />
      ))}
    </div>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  const [saved, setSaved] = useState(false);

  return (
    <article
      className="rounded-2xl overflow-hidden border flex flex-col transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E8F0",
        boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
      }}
    >
      <div className="relative h-40">
        <Image
          src={provider.imageUrl}
          alt={provider.name}
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.16) 0%, rgba(2,6,23,0.60) 100%)",
          }}
        />

        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {provider.verified && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#0F172A" }}
            >
              <BadgeCheck size={10} />
              Verificado
            </span>
          )}
          {provider.featured && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(15,23,42,0.82)", color: "#E2E8F0" }}
            >
              Em destaque
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.88)", color: saved ? "#DC2626" : "#475569" }}
          aria-label={saved ? "Remover favorito" : "Adicionar favorito"}
        >
          <Heart size={13} style={{ fill: saved ? "#DC2626" : "none" }} />
        </button>

        <div className="absolute left-3 bottom-3 right-3">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.88)", color: "#0F172A" }}
          >
            {provider.type === "empresa" ? <Building2 size={10} /> : <User size={10} />}
            {provider.type === "empresa" ? "Empresa" : "Prestador"}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-black truncate" style={{ color: "#0F172A" }}>
              {provider.name}
            </h3>
            <p className="text-[11px] font-medium mt-0.5" style={{ color: "#475569" }}>
              {provider.categoryLabel}
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <StarRating value={provider.rating} />
            <span className="text-[10px]" style={{ color: "#64748B" }}>
              {provider.rating} ({provider.reviews})
            </span>
          </div>
        </div>

        <p
          className="text-[11px] leading-relaxed mt-2"
          style={{
            color: "#334155",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {provider.description}
        </p>

        <div className="flex flex-wrap gap-1 mt-2">
          {provider.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#F1F5F9", color: "#475569" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 text-[10px]" style={{ color: "#64748B" }}>
          <div className="inline-flex items-center gap-1">
            <MapPin size={10} />
            {provider.location}
          </div>
          <div className="inline-flex items-center gap-1">
            <Clock3 size={10} />
            {provider.responseTime}
          </div>
        </div>

        <div className="mt-2">
          <span className="text-[10px]" style={{ color: "#94A3B8" }}>
            A partir de
          </span>
          <p className="text-sm font-black" style={{ color: "#0F172A" }}>
            {provider.priceFrom}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mt-3 pt-3" style={{ borderTop: "1px solid #F1F5F9" }}>
          <a
            href={`https://wa.me/${provider.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold rounded-lg px-3 py-2 inline-flex items-center justify-center gap-1"
            style={{ backgroundColor: "#ECFDF3", color: "#166534" }}
          >
            <MessageCircle size={12} />
            WhatsApp
          </a>
          <a
            href={`tel:+${provider.phone}`}
            className="text-[11px] font-semibold rounded-lg px-3 py-2 inline-flex items-center justify-center"
            style={{ border: "1px solid #E2E8F0", color: "#334155" }}
          >
            <Phone size={12} />
          </a>
          <Link
            href={`/provider/${provider.id}`}
            className="text-[11px] font-semibold rounded-lg px-3 py-2 inline-flex items-center justify-center"
            style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
          >
            Ver perfil
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CidadaoExplorer({ nome }: { nome: string }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "prestador" | "empresa">("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [priceTier, setPriceTier] = useState<PriceTier>("all");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("relevancia");
  const [visibleCount, setVisibleCount] = useState(EXPLORE_PAGE_SIZE);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const resetPagination = () => setVisibleCount(EXPLORE_PAGE_SIZE);

  const firstName = nome.split(" ")[0] ?? nome;

  const locationOptions = useMemo(
    () => ["all", ...Array.from(new Set(MOCK_PROVIDERS.map((provider) => provider.location)))],
    []
  );

  const filtered = useMemo(() => {
    const base = MOCK_PROVIDERS.filter((provider) => {
      const q = query.toLowerCase().trim();
      const matchCategory = activeCategory === "all" || provider.category === activeCategory;
      const matchType = typeFilter === "all" || provider.type === typeFilter;
      const matchLocation = locationFilter === "all" || provider.location === locationFilter;
      const matchRating = provider.rating >= minRating;
      const matchVerified = !onlyVerified || provider.verified;
      const matchPrice = matchesPriceTier(parseAoaPrice(provider.priceFrom), priceTier);
      const matchQuery =
        q.length === 0 ||
        provider.name.toLowerCase().includes(q) ||
        provider.categoryLabel.toLowerCase().includes(q) ||
        provider.location.toLowerCase().includes(q) ||
        provider.description.toLowerCase().includes(q) ||
        provider.tags.some((tag) => tag.toLowerCase().includes(q));
      return (
        matchCategory &&
        matchType &&
        matchLocation &&
        matchRating &&
        matchVerified &&
        matchPrice &&
        matchQuery
      );
    });

    return [...base].sort((a, b) => {
      if (sortBy === "avaliacao") {
        return b.rating - a.rating;
      }
      if (sortBy === "mais-avaliados") {
        return b.reviews - a.reviews;
      }
      if (sortBy === "menor-preco") {
        const pa = parseAoaPrice(a.priceFrom);
        const pb = parseAoaPrice(b.priceFrom);
        if (pa === null) return 1;
        if (pb === null) return -1;
        return pa - pb;
      }
      if (sortBy === "maior-preco") {
        const pa = parseAoaPrice(a.priceFrom);
        const pb = parseAoaPrice(b.priceFrom);
        if (pa === null) return 1;
        if (pb === null) return -1;
        return pb - pa;
      }
      return Number(b.featured) - Number(a.featured) || Number(b.verified) - Number(a.verified) || b.reviews - a.reviews;
    });
  }, [
    activeCategory,
    locationFilter,
    minRating,
    onlyVerified,
    priceTier,
    query,
    sortBy,
    typeFilter,
  ]);

  const featured = MOCK_PROVIDERS.filter((item) => item.featured);
  const hasActiveFilters =
    query !== "" ||
    activeCategory !== "all" ||
    typeFilter !== "all" ||
    locationFilter !== "all" ||
    minRating > 0 ||
    priceTier !== "all" ||
    onlyVerified ||
    sortBy !== "relevancia";

  const visibleProviders = filtered.slice(0, visibleCount);
  const hasMoreProviders = filtered.length > visibleCount;
  const activeSlide = HERO_SLIDES[activeSlideIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <section
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundImage: activeSlide.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 400ms ease",
        }}
      >
        <div className="px-6 py-7 md:px-10 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-2 text-sm font-black px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.18)", color: "#FFFFFF" }}
              >
                <Sparkles size={13} />
                Linium Discover
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#E2E8F0" }}>
              <span>Início</span>
              <span>Empresas</span>
              <span>Prestadores</span>
              <span>Categorias</span>
            </nav>
          </div>

          <p className="text-sm mb-1" style={{ color: "#93C5FD" }}>
            Olá, {firstName}
          </p>
          <h1 className="text-3xl md:text-5xl font-black leading-tight" style={{ color: "#FFFFFF" }}>
            {activeSlide.title.split("|").map((line, index) => (
              <span key={line}>
                {line}
                {index < activeSlide.title.split("|").length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="text-sm md:text-base mt-3 max-w-2xl" style={{ color: "#D1D5DB" }}>
            {activeSlide.description}
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <Link
              href={activeSlide.ctaHref}
              className="text-xs md:text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer"
              style={{ backgroundColor: "#F4A300", color: "#0F172A" }}
            >
              {activeSlide.ctaLabel}
            </Link>
            <div className="inline-flex items-center gap-1">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeSlideIndex;
                return (
                  <button
                    key={slide.ctaLabel}
                    type="button"
                    onClick={() => setActiveSlideIndex(index)}
                    className="h-2.5 rounded-full cursor-pointer"
                    style={{
                      width: isActive ? "24px" : "10px",
                      backgroundColor: isActive ? "#F4A300" : "rgba(255,255,255,0.45)",
                    }}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="mt-7 rounded-2xl p-3 md:p-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            <div className="grid md:grid-cols-[1fr_auto_auto] gap-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748B" }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    resetPagination();
                  }}
                  placeholder="Pesquisar por serviço, empresa ou localização"
                  className="w-full text-sm pl-9 pr-9 py-2.5 rounded-xl"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      resetPagination();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#64748B" }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div
                className="text-xs md:text-sm rounded-xl px-3 py-2.5 flex items-center justify-center"
                style={{ backgroundColor: "#F8FAFC", color: "#334155", border: "1px solid #E2E8F0" }}
              >
                {MOCK_PROVIDERS.length} opções
              </div>
              <button
                type="button"
                className="text-sm rounded-xl px-4 py-2.5 font-semibold"
                style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5">
        <div
          className="rounded-2xl border p-4 md:p-5"
          style={{
            background:
              "linear-gradient(125deg, rgba(15,23,42,0.97) 20%, rgba(20,64,104,0.95) 100%)",
            borderColor: "#1E3A61",
          }}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-semibold" style={{ color: "#93C5FD" }}>
                Bem exposto para clientes
              </p>
              <h2 className="text-xl md:text-2xl font-black mt-1" style={{ color: "#FFFFFF" }}>
                Abertura de conta em bancos angolanos
              </h2>
              <p className="text-xs md:text-sm mt-2 max-w-2xl" style={{ color: "#CBD5E1" }}>
                Evite filas: inicie o processo com BI em PDF, foto, assinatura e dados biometricos.
              </p>
            </div>
            <Link
              href="/bancos"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
              style={{ backgroundColor: "#F4A300", color: "#0F172A" }}
            >
              Comecar abertura
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 mt-4">
            {ANGOLA_BANKS.map((bank) => (
              <div
                key={bank.name}
                className="rounded-xl border px-3 py-2.5 flex items-center gap-2"
                style={{
                  backgroundColor: "rgba(255,255,255,0.92)",
                  borderColor: "rgba(148,163,184,0.4)",
                }}
              >
                <Image src={bank.logo} alt={`Logo ${bank.name}`} width={28} height={28} />
                <div className="min-w-0">
                  <p className="text-xs font-black truncate" style={{ color: "#0F172A" }}>
                    {bank.name}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: "#64748B" }}>
                    {bank.fullName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(({ key, label, Icon }) => {
            const active = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveCategory(key);
                  resetPagination();
                }}
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: active ? "#0F172A" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#334155",
                  borderColor: active ? "#0F172A" : "#E2E8F0",
                }}
              >
                <Icon size={13} style={{ color: active ? "#FFFFFF" : "#475569" }} />
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {!hasActiveFilters && (
        <section className="pt-7">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-black" style={{ color: "#0F172A" }}>
              Destaques da semana
            </h2>
            <span className="text-xs" style={{ color: "#64748B" }}>
              {featured.length} em destaque
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
            {featured.map((provider) => (
              <div key={provider.id} className="w-72 shrink-0" style={{ scrollSnapAlign: "start" }}>
                <ProviderCard provider={provider} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="explore-results" className="pt-7">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black" style={{ color: "#0F172A" }}>
              {hasActiveFilters ? "Resultados da pesquisa" : "Explore tudo"}
            </h2>
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#F1F5F9", color: "#334155" }}
            >
              {filtered.length}
            </span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Link
              href="/bancos"
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
            >
              Abrir conta bancária
            </Link>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold" style={{ color: "#64748B" }}>
              <SlidersHorizontal size={13} />
              Filtros avançados
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl border p-3 md:p-4 mb-4"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
        >
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-2">
            <label className="text-[11px]" style={{ color: "#64748B" }}>
              Tipo
              <select
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value as "all" | "prestador" | "empresa");
                  resetPagination();
                }}
                className="w-full mt-1 text-xs rounded-lg px-2.5 py-2"
                style={{ border: "1px solid #E2E8F0", color: "#0F172A", backgroundColor: "#FFFFFF" }}
              >
                <option value="all">Todos</option>
                <option value="empresa">Empresas</option>
                <option value="prestador">Prestadores</option>
              </select>
            </label>

            <label className="text-[11px]" style={{ color: "#64748B" }}>
              Localização
              <select
                value={locationFilter}
                onChange={(event) => {
                  setLocationFilter(event.target.value);
                  resetPagination();
                }}
                className="w-full mt-1 text-xs rounded-lg px-2.5 py-2"
                style={{ border: "1px solid #E2E8F0", color: "#0F172A", backgroundColor: "#FFFFFF" }}
              >
                <option value="all">Todas</option>
                {locationOptions
                  .filter((location) => location !== "all")
                  .map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
            </label>

            <label className="text-[11px]" style={{ color: "#64748B" }}>
              Avaliação mínima
              <select
                value={String(minRating)}
                onChange={(event) => {
                  setMinRating(Number(event.target.value));
                  resetPagination();
                }}
                className="w-full mt-1 text-xs rounded-lg px-2.5 py-2"
                style={{ border: "1px solid #E2E8F0", color: "#0F172A", backgroundColor: "#FFFFFF" }}
              >
                <option value="0">Qualquer</option>
                <option value="4">4.0+</option>
                <option value="4.5">4.5+</option>
                <option value="4.8">4.8+</option>
              </select>
            </label>

            <label className="text-[11px]" style={{ color: "#64748B" }}>
              Faixa de preço
              <select
                value={priceTier}
                onChange={(event) => {
                  setPriceTier(event.target.value as PriceTier);
                  resetPagination();
                }}
                className="w-full mt-1 text-xs rounded-lg px-2.5 py-2"
                style={{ border: "1px solid #E2E8F0", color: "#0F172A", backgroundColor: "#FFFFFF" }}
              >
                <option value="all">Todas</option>
                <option value="economico">Económico (até 10.000)</option>
                <option value="medio">Médio (10.001 a 30.000)</option>
                <option value="premium">Premium (acima de 30.000)</option>
              </select>
            </label>

            <label className="text-[11px]" style={{ color: "#64748B" }}>
              Ordenar por
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value as SortKey);
                  resetPagination();
                }}
                className="w-full mt-1 text-xs rounded-lg px-2.5 py-2"
                style={{ border: "1px solid #E2E8F0", color: "#0F172A", backgroundColor: "#FFFFFF" }}
              >
                <option value="relevancia">Relevância</option>
                <option value="avaliacao">Melhor avaliação</option>
                <option value="mais-avaliados">Mais avaliados</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOnlyVerified((prev) => !prev);
                resetPagination();
              }}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: onlyVerified ? "#ECFDF3" : "#FFFFFF",
                color: onlyVerified ? "#166534" : "#334155",
                borderColor: onlyVerified ? "#86EFAC" : "#E2E8F0",
              }}
            >
              Somente verificados
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                  setTypeFilter("all");
                  setLocationFilter("all");
                  setMinRating(0);
                  setPriceTier("all");
                  setOnlyVerified(false);
                  setSortBy("relevancia");
                  resetPagination();
                }}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
              >
                Limpar todos os filtros
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="rounded-2xl border py-14 text-center"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0" }}
          >
            <Search size={28} className="mx-auto mb-3" style={{ color: "#CBD5E1" }} />
            <p className="text-sm font-bold" style={{ color: "#0F172A" }}>
              Nenhum resultado encontrado
            </p>
            <p className="text-xs mt-1" style={{ color: "#64748B" }}>
              Ajuste os filtros para ver mais opções.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
                setTypeFilter("all");
                resetPagination();
              }}
              className="mt-4 text-xs font-semibold px-4 py-2 rounded-xl"
              style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {visibleProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>

            {hasMoreProviders && (
              <div className="flex justify-center mt-5">
                <button
                  type="button"
                  onClick={() => setVisibleCount((current) => current + EXPLORE_PAGE_SIZE)}
                  className="text-sm font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
                  style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
                >
                  Ver mais
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
