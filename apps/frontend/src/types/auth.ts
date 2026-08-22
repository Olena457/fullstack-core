export interface User {
  id: string;
  email: string;
  name?: string;
  role?: "USER" | "ADMIN";
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
