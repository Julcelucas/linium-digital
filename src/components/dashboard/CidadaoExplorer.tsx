"use client";

import { useMemo, useState, type ComponentType, type CSSProperties } from "react";
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

type Provider = {
  id: string;
  type: "prestador" | "empresa";
  name: string;
  category: Exclude<CategoryKey, "all">;
  categoryLabel: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  phone: string;
  verified: boolean;
  responseTime: string;
  tags: string[];
  featured: boolean;
  priceFrom: string;
};

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

const MOCK_PROVIDERS: Provider[] = [
  {
    id: "1",
    type: "empresa",
    name: "ByteWave Solutions",
    category: "tecnologia",
    categoryLabel: "Computadores & Assistência",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 173,
    description:
      "Venda e manutenção de computadores, redes empresariais e suporte técnico para casas e escritórios.",
    location: "Luanda, Ingombota",
    phone: "244923100101",
    verified: true,
    responseTime: "< 30 min",
    tags: ["Hardware", "Redes", "Suporte"],
    featured: true,
    priceFrom: "AOA 12.000",
  },
  {
    id: "2",
    type: "empresa",
    name: "Sabor Capital",
    category: "restaurantes",
    categoryLabel: "Restaurante Premium",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 294,
    description:
      "Experiência gastronómica com cozinha nacional e internacional, reservas para eventos e serviço executivo.",
    location: "Luanda, Talatona",
    phone: "244923200202",
    verified: true,
    responseTime: "Reserva imediata",
    tags: ["Reservas", "Eventos", "Delivery"],
    featured: true,
    priceFrom: "AOA 9.000",
  },
  {
    id: "3",
    type: "empresa",
    name: "Farmácia Vida+",
    category: "farmacias",
    categoryLabel: "Farmácia & Bem-estar",
    imageUrl:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 412,
    description:
      "Medicamentos, produtos de saúde e atendimento farmacêutico com entrega rápida em vários bairros.",
    location: "Luanda, Maianga",
    phone: "244923300303",
    verified: true,
    responseTime: "< 20 min",
    tags: ["24h", "Entrega", "Receitas"],
    featured: true,
    priceFrom: "AOA 2.500",
  },
  {
    id: "4",
    type: "prestador",
    name: "Carlos Eletricista",
    category: "eletricidade",
    categoryLabel: "Serviços Elétricos",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252472-e8f4f03f18a0?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 88,
    description:
      "Instalações, reparações e manutenção elétrica residencial com atendimento de urgência.",
    location: "Luanda, Cazenga",
    phone: "244923400404",
    verified: true,
    responseTime: "< 45 min",
    tags: ["Urgência", "Residencial", "Inspeção"],
    featured: false,
    priceFrom: "AOA 7.500",
  },
  {
    id: "5",
    type: "empresa",
    name: "Escola Horizonte",
    category: "escolas",
    categoryLabel: "Educação Privada",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 136,
    description:
      "Ensino de qualidade com atividades extracurriculares, laboratórios modernos e apoio pedagógico.",
    location: "Luanda, Benfica",
    phone: "244923500505",
    verified: true,
    responseTime: "Resposta no dia",
    tags: ["Matrículas", "Transporte", "Atividades"],
    featured: false,
    priceFrom: "AOA 45.000",
  },
  {
    id: "6",
    type: "empresa",
    name: "Banco Litoral",
    category: "bancos",
    categoryLabel: "Serviços Bancários",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviews: 164,
    description:
      "Contas, créditos, pagamentos digitais e soluções financeiras para famílias e empresas.",
    location: "Luanda, Mutamba",
    phone: "244923600606",
    verified: true,
    responseTime: "Agendamento",
    tags: ["Crédito", "Empresas", "Digital"],
    featured: false,
    priceFrom: "Sem custo inicial",
  },
  {
    id: "7",
    type: "empresa",
    name: "Hotel Atlântico",
    category: "hoteis",
    categoryLabel: "Hospedagem & Eventos",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 223,
    description:
      "Suites modernas, restaurante, salas para eventos e reservas para estadias curtas ou longas.",
    location: "Luanda, Ilha",
    phone: "244923700707",
    verified: true,
    responseTime: "Reserva imediata",
    tags: ["Suites", "Eventos", "Business"],
    featured: true,
    priceFrom: "AOA 38.000",
  },
  {
    id: "8",
    type: "empresa",
    name: "BluePool Center",
    category: "lazer",
    categoryLabel: "Piscinas & Lazer",
    imageUrl:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 97,
    description:
      "Centro de lazer com piscina, aulas aquáticas e programas para família durante toda a semana.",
    location: "Luanda, Talatona",
    phone: "244923800808",
    verified: false,
    responseTime: "< 2h",
    tags: ["Família", "Aulas", "Fim de semana"],
    featured: false,
    priceFrom: "AOA 6.000",
  },
  {
    id: "9",
    type: "prestador",
    name: "Marta TI Express",
    category: "tecnologia",
    categoryLabel: "Suporte Técnico",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 121,
    description:
      "Atendimento ao domicílio para formatação, upgrades e solução de problemas em computadores e impressoras.",
    location: "Luanda, Kilamba",
    phone: "244923900909",
    verified: true,
    responseTime: "< 1h",
    tags: ["Domicílio", "Windows", "Impressoras"],
    featured: false,
    priceFrom: "AOA 5.500",
  },
  {
    id: "10",
    type: "prestador",
    name: "Chef Nando Eventos",
    category: "restaurantes",
    categoryLabel: "Catering & Eventos",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 76,
    description:
      "Serviço de catering para casamentos, aniversários e eventos corporativos com menus personalizados.",
    location: "Luanda, Viana",
    phone: "244924010010",
    verified: true,
    responseTime: "< 3h",
    tags: ["Catering", "Eventos", "Buffet"],
    featured: false,
    priceFrom: "AOA 18.000",
  },
  {
    id: "11",
    type: "empresa",
    name: "Colégio Nova Geração",
    category: "escolas",
    categoryLabel: "Ensino Médio",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 59,
    description:
      "Instituição focada em excelência académica, inovação digital e preparação para o ensino superior.",
    location: "Luanda, Rangel",
    phone: "244924110110",
    verified: false,
    responseTime: "1 dia útil",
    tags: ["Secundário", "Tecnologia", "Bolsas"],
    featured: false,
    priceFrom: "AOA 35.000",
  },
  {
    id: "12",
    type: "prestador",
    name: "Nuno Hotel Concierge",
    category: "hoteis",
    categoryLabel: "Reserva & Concierge",
    imageUrl:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 44,
    description:
      "Consultoria para reservas, organização de estadias e experiências premium para viagens em família.",
    location: "Luanda, Ingombota",
    phone: "244924210210",
    verified: true,
    responseTime: "< 1h",
    tags: ["Concierge", "Reservas", "Premium"],
    featured: false,
    priceFrom: "AOA 10.000",
  },
  {
    id: "13",
    type: "empresa",
    name: "MultiServ Angola",
    category: "outros",
    categoryLabel: "Serviços Diversos",
    imageUrl:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviews: 68,
    description:
      "Serviços gerais para casa e empresa: apoio administrativo, logística leve e soluções rápidas para necessidades do dia a dia.",
    location: "Luanda, Alvalade",
    phone: "244924310310",
    verified: true,
    responseTime: "< 2h",
    tags: ["Diversos", "Empresas", "Residencial"],
    featured: false,
    priceFrom: "AOA 4.500",
  },
];

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
        <img
          src={provider.imageUrl}
          alt={provider.name}
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
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
          <button
            type="button"
            className="text-[11px] font-semibold rounded-lg px-3 py-2"
            style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
          >
            Ver perfil
          </button>
        </div>
      </div>
    </article>
  );
}

export function CidadaoExplorer({ nome }: { nome: string }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "prestador" | "empresa">("all");

  const firstName = nome.split(" ")[0] ?? nome;

  const filtered = useMemo(() => {
    return MOCK_PROVIDERS.filter((provider) => {
      const q = query.toLowerCase().trim();
      const matchCategory = activeCategory === "all" || provider.category === activeCategory;
      const matchType = typeFilter === "all" || provider.type === typeFilter;
      const matchQuery =
        q.length === 0 ||
        provider.name.toLowerCase().includes(q) ||
        provider.categoryLabel.toLowerCase().includes(q) ||
        provider.location.toLowerCase().includes(q) ||
        provider.description.toLowerCase().includes(q) ||
        provider.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCategory && matchType && matchQuery;
    });
  }, [activeCategory, query, typeFilter]);

  const featured = MOCK_PROVIDERS.filter((item) => item.featured);
  const hasActiveFilters = query !== "" || activeCategory !== "all" || typeFilter !== "all";

  return (
    <div>
      <section
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(2,6,23,0.86) 15%, rgba(2,6,23,0.56) 48%, rgba(2,6,23,0.42) 100%), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
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
            Encontre serviços e negócios
            <br />
            ideais para o seu dia a dia
          </h1>
          <p className="text-sm md:text-base mt-3 max-w-2xl" style={{ color: "#D1D5DB" }}>
            Explore computadores, restaurantes, farmácias, bancos, escolas, hotéis,
            piscinas e muito mais em um só ambiente.
          </p>

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
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pesquisar por serviço, empresa ou localização"
                  className="w-full text-sm pl-9 pr-9 py-2.5 rounded-xl"
                  style={{ border: "1px solid #E2E8F0", color: "#0F172A" }}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
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

      <section className="pt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(({ key, label, Icon }) => {
            const active = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
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

      <section className="pt-7">
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
            <SlidersHorizontal size={13} style={{ color: "#64748B" }} />
            <div className="inline-flex rounded-lg p-0.5" style={{ backgroundColor: "#F1F5F9" }}>
              {([
                { key: "all", label: "Todos" },
                { key: "empresa", label: "Empresas" },
                { key: "prestador", label: "Prestadores" },
              ] as const).map((option) => {
                const active = typeFilter === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTypeFilter(option.key)}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-md"
                    style={{
                      backgroundColor: active ? "#FFFFFF" : "transparent",
                      color: active ? "#0F172A" : "#64748B",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
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
              }}
              className="mt-4 text-xs font-semibold px-4 py-2 rounded-xl"
              style={{ backgroundColor: "#0F172A", color: "#FFFFFF" }}
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
