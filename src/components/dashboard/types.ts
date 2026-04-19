export type RoleType = "cidadao" | "prestador" | "empresa";

export type MetricIconType = "trend" | "wallet" | "check";

export type ModuleIconType =
  | "calendar"
  | "map"
  | "message"
  | "check"
  | "money"
  | "team"
  | "clipboard";

export type RoleDashboard = {
  accent: string;
  heading: string;
  intro: string;
  metrics: Array<{ label: string; value: string; icon: MetricIconType }>;
  quickActions: string[];
  modules: Array<{ title: string; detail: string; icon: ModuleIconType }>;
};
