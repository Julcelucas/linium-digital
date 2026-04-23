import { Building2, BriefcaseBusiness, CalendarCheck, ClipboardList, Handshake, Inbox, LayoutDashboard } from "lucide-react";
import { RoleDashboard, RoleType } from "./types";

export const roleLabel: Record<RoleType, string> = {
  cidadao: "Cidadao / Cliente",
  prestador: "Prestador Informal",
  empresa: "Empresa Formal",
};

export const roleExperience: Record<RoleType, RoleDashboard> = {
  cidadao: {
    accent: "#2E6DA4",
    heading: "Painel de Cliente",
    intro: "Acompanha pedidos, agenda servicos e compara prestadores certificados.",
    metrics: [
      { label: "Pedidos concluidos", value: "14", icon: "trend" },
      { label: "Poupanca media", value: "AOA 24.300", icon: "wallet" },
      { label: "Avaliacoes feitas", value: "11", icon: "check" },
    ],
    quickActions: [
      "Agendar manutencao eletrica para esta semana",
      "Comparar 3 orcamentos na categoria Canalizacao",
      "Finalizar avaliacao pendente do ultimo servico",
    ],
    modules: [
      {
        title: "Agenda de Servicos",
        detail: "2 servicos marcados para as proximas 48h.",
        icon: "calendar",
      },
      {
        title: "Mapa de Prestadores",
        detail: "18 prestadores certificados perto de ti.",
        icon: "map",
      },
      {
        title: "Mensagens",
        detail: "4 conversas abertas com prestadores.",
        icon: "message",
      },
    ],
  },
  prestador: {
    accent: "#27AE60",
    heading: "Painel Simples do Prestador",
    intro: "Veja pedidos, responda clientes e acompanhe os seus ganhos de forma simples.",
    metrics: [
      { label: "Pedidos de hoje", value: "7", icon: "trend" },
      { label: "Ganhos da semana", value: "AOA 186.000", icon: "wallet" },
      { label: "Pendentes", value: "3", icon: "check" },
    ],
    quickActions: [
      "Responder 3 pedidos pendentes agora",
      "Marcar horarios livres para amanha",
      "Adicionar fotos de trabalhos recentes",
    ],
    modules: [
      {
        title: "Pedidos",
        detail: "7 clientes aguardam resposta.",
        icon: "message",
      },
      {
        title: "Perfil",
        detail: "Conta verificada e ativa.",
        icon: "check",
      },
      {
        title: "Ganhos",
        detail: "Entradas desta semana atualizadas.",
        icon: "money",
      },
    ],
  },
  empresa: {
    accent: "#F0A500",
    heading: "Painel Empresarial",
    intro: "Controla operacoes, equipa e crescimento comercial da empresa.",
    metrics: [
      { label: "Novos clientes", value: "27", icon: "trend" },
      { label: "Faturacao projetada", value: "AOA 1.240.000", icon: "wallet" },
      { label: "SLA cumprido", value: "96%", icon: "check" },
    ],
    quickActions: [
      "Aprovar orcamento de campanha para Luanda",
      "Fechar proposta com 2 parceiros institucionais",
      "Rever desempenho da equipa comercial",
    ],
    modules: [
      {
        title: "Operacoes",
        detail: "12 ordens de servico em execucao.",
        icon: "clipboard",
      },
      {
        title: "Parcerias",
        detail: "4 negociacoes ativas com novos parceiros.",
        icon: "team",
      },
      {
        title: "Planeamento",
        detail: "Proximo ciclo estrategico em 5 dias.",
        icon: "calendar",
      },
    ],
  },
};

export const roleHeader = {
  cidadao: {
    subtitle: "Experiencia do Cliente",
    gradient: "linear-gradient(120deg, #0D1B2A 0%, #1A3A5C 100%)",
  },
  prestador: {
    subtitle: "Area Simples do Prestador",
    gradient: "linear-gradient(120deg, #0D1B2A 0%, #1C6B4E 100%)",
  },
  empresa: {
    subtitle: "Painel Executivo Empresarial",
    gradient: "linear-gradient(120deg, #0D1B2A 0%, #7B5A0A 100%)",
  },
} as const;

export const roleSidebar = {
  prestador: [
    { label: "Visao Geral", icon: LayoutDashboard },
    { label: "Leads", icon: Inbox },
    { label: "Servicos", icon: BriefcaseBusiness },
    { label: "Agenda", icon: CalendarCheck },
  ],
  empresa: [
    { label: "Visao Geral", icon: LayoutDashboard },
    { label: "Operacoes", icon: ClipboardList },
    { label: "Parcerias", icon: Handshake },
    { label: "Equipa", icon: Building2 },
  ],
} as const;

export const roleSignals = {
  cidadao: {
    alertTitle: "Atencao a avaliacoes pendentes",
    alertText: "Tens 2 servicos concluidos sem avaliacao. Avaliar melhora a qualidade das recomendacoes.",
    emptyTitle: "Sem disputas abertas",
    emptyText: "Nenhum problema ativo com pedidos recentes. Tudo a correr bem.",
  },
  prestador: {
    alertTitle: "Pedidos a espera",
    alertText: "Tem 3 pedidos sem resposta. Responda agora para nao perder clientes.",
    emptyTitle: "Sem cancelamentos hoje",
    emptyText: "Bom trabalho: nenhum cliente cancelou atendimento hoje.",
  },
  empresa: {
    alertTitle: "Meta mensal abaixo do planeado",
    alertText: "A unidade comercial esta 8% abaixo da meta prevista para este mes.",
    emptyTitle: "Sem incidentes criticos",
    emptyText: "Nenhum incidente operacional critico registado nas ultimas 24h.",
  },
} as const;
