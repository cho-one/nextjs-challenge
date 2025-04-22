"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../app/actions";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, {
    success: false,
    message: "",
  });
  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-80 mx-auto mt-10"
    >
      <input
        name="email"
        placeholder="Email"
        className="border px-4 py-2 rounded-full"
      />
      <input
        name="username"
        placeholder="Username"
        className="border px-4 py-2 rounded-full "
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className={`border px-4 py-2 rounded-full ${
          !state.success && state.message ? "border-red-500" : ""
        }`}
      />

      {!state.success && state.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
      {state.success && (
        <p className="text-sm text-green-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white py-2 rounded-full disabled:opacity-50"
      >
        {pending ? "Loading..." : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
