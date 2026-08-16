import * as yup from 'yup';

const nameRegex = /^[a-zA-Za-яА-ЯіІєЄїЇґҐ\s]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .matches(nameRegex, 'Name must contain only letters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .lowercase()
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot exceed 20 characters')
    .matches(
      passwordRegex,
      'Password must include uppercase, lowercase, number and special character',
    ),
});

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
