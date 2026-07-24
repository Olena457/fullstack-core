
"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../components/auth/schemas/checkout";
import type { CheckoutFormData } from "../components/auth/schemas/checkout";

export const useCheckoutForm = (defaultValues?: Partial<CheckoutFormData>) => {
  return useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
    defaultValues, 
    mode: "onBlur", 
  });
};
