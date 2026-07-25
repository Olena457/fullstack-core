
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  npCity: string;
  npBranch: string;
}

export interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void | Promise<void>;
  isLoading: boolean;
  defaultValues?: Partial<CheckoutFormData>;
}