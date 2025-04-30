"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { login } from "../app/actions";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, {
    success: false,
    message: "",
    errors: {},
  });
  const { pending } = useFormStatus();

  // commit test

  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!state.success && state.message && passwordRef.current) {
      passwordRef.current.value = "";
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
      <p className="text-sm text-gray-500 mb-2">
        Please enter your email and password to log in.
      </p>
      <form
        action={formAction}
        className="flex flex-col gap-4 w-[350px] mx-auto mt-10 text-sm"
      >
        {/* Email */}
        <div
          className={`flex items-center gap-2 border px-4 py-3 rounded-full bg-white text-neutral-700 ${
            state.errors?.email ? "border-red-400" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-neutral-400"
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            ></path>
          </svg>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="email@zod.com"
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none bg-transparent placeholder:text-neutral-400"
          />
        </div>
        {state.errors?.email && (
          <p className="text-xs text-red-500 pl-4">{state.errors.email}</p>
        )}

        {/* Username */}
        <div
          className={`flex items-center gap-2 border px-4 py-3 rounded-full bg-white text-neutral-700 ${
            state.errors?.username ? "border-red-400" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-neutral-400"
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            ></path>
          </svg>
          <input
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 outline-none bg-transparent placeholder:text-neutral-400"
          />
        </div>
        {state.errors?.username && (
          <p className="text-xs text-red-500 pl-4">{state.errors.username}</p>
        )}

        {/* Password */}
        <div
          className={`flex items-center gap-2 border px-4 py-3 rounded-full bg-white text-neutral-700 ${
            state.errors?.password ? "border-red-400" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-neutral-400"
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            ></path>
          </svg>
          <input
            name="password"
            type="password"
            placeholder="••••••••••"
            ref={passwordRef}
            className="flex-1 outline-none bg-transparent placeholder:text-neutral-400"
          />
        </div>
        {state.errors?.password && (
          <p className="text-xs text-red-500 pl-4">{state.errors.password}</p>
        )}

        {/* Global message */}
        {!state.success && state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="bg-black text-white py-2 rounded-full disabled:opacity-50"
        >
          {pending ? "Loading..." : "Log in"}
        </button>
        {state.success && (
          <p className="text-sm bg-green-600 text-white py-2 rounded-lg text-center">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
