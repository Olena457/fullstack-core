import type { ComponentProps } from "react";
import { OrderCard } from "../components/order/OrderCard";

export interface AuthState {
  user: {
    role?: string;
    name?: string;
    email?: string;
  } | null;
  token: string | null;
}

export type AdminOrder = ComponentProps<typeof OrderCard>["order"] & {
  user?: {
    name: string;
    email: string;
  };
  npCity?: string;
  npBranch?: string;
  phone?: string;
  status: string;
};
