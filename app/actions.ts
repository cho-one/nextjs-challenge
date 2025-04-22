"use server";

import { LoginState } from "@/\btype";

export async function login(prevState: LoginState, formData: FormData) {
  const password = formData.get("password");
  if (password === "12345") {
    return { success: true, message: "로그인 성공!" };
  }
  return { success: false, message: "Wrong password" };
}
