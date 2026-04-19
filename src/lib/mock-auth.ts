export type UserRole = "cidadao" | "prestador" | "empresa";

export type MockUser = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  password: string;
  role: UserRole;
  provincia?: string;
  categoria?: string;
  nomeEmpresa?: string;
  nif?: string;
  createdAt: string;
};

const USERS_KEY = "linium_users";
const SESSION_KEY = "linium_session";

const demoUsers: MockUser[] = [
  {
    id: "u-001",
    nome: "Ana Cliente",
    email: "cliente@linium.ao",
    telefone: "+244 923 000 111",
    password: "Cliente@123",
    role: "cidadao",
    provincia: "Luanda",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-002",
    nome: "Mário Canalizador",
    email: "prestador@linium.ao",
    telefone: "+244 923 000 222",
    password: "Prestador@123",
    role: "prestador",
    categoria: "Serviços Básicos",
    provincia: "Luanda",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-003",
    nome: "Sara Fernandes",
    email: "empresa@linium.ao",
    telefone: "+244 923 000 333",
    password: "Empresa@123",
    role: "empresa",
    nomeEmpresa: "TechAngola Lda.",
    nif: "5000123456",
    categoria: "Tecnologia e Informática",
    provincia: "Benguela",
    createdAt: new Date().toISOString(),
  },
];

function ensureBrowser() {
  if (typeof window === "undefined") {
    throw new Error("Auth mock disponível apenas no browser");
  }
}

function readUsers(): MockUser[] {
  ensureBrowser();
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as MockUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: MockUser[]) {
  ensureBrowser();
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function seedDemoUsers() {
  ensureBrowser();
  const existing = readUsers();

  const existingEmails = new Set(existing.map((u) => u.email.toLowerCase()));
  const missingDemoUsers = demoUsers.filter(
    (demo) => !existingEmails.has(demo.email.toLowerCase())
  );

  if (missingDemoUsers.length > 0) {
    writeUsers([...existing, ...missingDemoUsers]);
  }
}

export function getDemoCredentials() {
  return demoUsers.map((user) => ({
    role: user.role,
    email: user.email,
    password: user.password,
  }));
}

export function registerMockUser(
  payload: Omit<MockUser, "id" | "createdAt">
): MockUser {
  ensureBrowser();
  const users = readUsers();

  const exists = users.some(
    (u) => u.email.toLowerCase() === payload.email.toLowerCase()
  );

  if (exists) {
    throw new Error("Já existe uma conta com este email.");
  }

  const newUser: MockUser = {
    ...payload,
    id: `u-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, newUser]);
  return newUser;
}

export function loginMockUser(email: string, password: string): MockUser {
  ensureBrowser();
  const users = readUsers();

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function getCurrentUser(): MockUser | null {
  ensureBrowser();
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function logoutMockUser() {
  ensureBrowser();
  localStorage.removeItem(SESSION_KEY);
}
