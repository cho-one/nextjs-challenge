"use server";

import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .endsWith("@zod.com", { message: "Only @zod.com emails are allowed" }),
  username: z.string().min(5, "Username should be at least 5 characters long."),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(/\d/, "Password should contain at least one number (0123456789)."),
});

type FormState = {
  success: boolean;
  message: string;
  errors?: {
    email?: string;
    username?: string;
    password?: string;
  };
};

export async function login(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Validation failed",
      errors: {
        email: fieldErrors.email?.[0],
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  return {
    success: true,
    message: "Login successful!",
  };
}
