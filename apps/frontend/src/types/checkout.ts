export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  npCity: string; 
  npBranch: string;
}

export interface CheckoutFormProps {
  formData: CheckoutFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  isLoading: boolean;
}
