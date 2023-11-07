import { z } from "zod";

const SignUpSchema = z
  .object({
    email: z.string().email().min(1),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default SignUpSchema;
