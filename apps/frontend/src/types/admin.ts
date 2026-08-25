import type { ComponentProps, ReactNode } from "react";
import { OrderCard } from "../components/order/OrderCard";

export interface AuthState {
  user: {
    role?: string;
    name?: string;
    email?: string;
  } | null;
  token: string | null;
}

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "CANCELLED";

export type AdminOrder = ComponentProps<typeof OrderCard>["order"] & {
  user?: {
    id?: string;
    name: string;
    email: string;
  } | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  npCity?: string | null;
  npBranch?: string | null;
  phone?: string | null;
  status: OrderStatus;
};

export interface TableColumn<T> {
  key: string;
  label: string | ReactNode;
  render: (row: T) => ReactNode;
  width?: string | number;
}
