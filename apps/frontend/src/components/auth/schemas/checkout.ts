import * as yup from "yup";

export const checkoutSchema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    address: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    postalCode: yup.string().required("Postal code is required"),
  })
  .required();

export type CheckoutFormData = yup.InferType<typeof checkoutSchema>;
