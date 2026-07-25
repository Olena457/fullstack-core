
import * as yup from "yup";

export const checkoutSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),

  npCity: yup.string().required("City is required"),
  npBranch: yup.string().required("Branch or address is required"),
});

export type CheckoutFormData = yup.InferType<typeof checkoutSchema>;